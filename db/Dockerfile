FROM flyway/flyway:8.0.4-alpine

COPY ./*.sql /flyway/sql/
COPY ./flyway.conf /flyway/conf

ENTRYPOINT [ "flyway", "migrate" ]