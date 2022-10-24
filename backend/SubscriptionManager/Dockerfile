FROM mcr.microsoft.com/dotnet/aspnet:6.0 as base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT Development

FROM mcr.microsoft.com/dotnet/sdk:6.0 as build 
WORKDIR /src 
COPY ["./src/SubscriptionManager.csproj", "/src"]
COPY ["./nuget.config", "./"]
RUN dotnet restore "SubscriptionManager.csproj"
COPY ./src .

WORKDIR "/src"
RUN dotnet build "SubscriptionManager.csproj" -c Release -o /SubscriptionManager/build

FROM build as publish
RUN dotnet publish "SubscriptionManager.csproj" -c Release -o /SubscriptionManager/publish

FROM base as final
WORKDIR /SubscriptionManager
COPY --from=publish /SubscriptionManager/publish .
ENTRYPOINT [ "dotnet", "SubscriptionManager.dll" ]