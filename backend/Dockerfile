FROM mcr.microsoft.com/dotnet/sdk:6.0 as build-image
WORKDIR /home/app
COPY ./*.sln ./
COPY ./*/*.csproj ./
RUN for file in $(ls *.csproj); do mkdir -p ./${file%.*}/ && mv $file ./${file%.*}/; done
WORKDIR /home/app/SubscriptionManager/
RUN dotnet restore
COPY . .
RUN dotnet publish ./SubscriptionManager/SubscriptionManager.csproj -o /publish/
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /publish
COPY --from=build-image /publish .

ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "SubscriptionManager.dll"]