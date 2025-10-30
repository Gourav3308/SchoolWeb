# ===== Build stage =====
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy only backend to leverage Docker layer caching
COPY pom.xml .
COPY src ./src

RUN mvn -q -DskipTests clean package

# ===== Runtime stage =====
FROM eclipse-temurin:17-jre
WORKDIR /app

ENV JAVA_OPTS=""
ENV PORT=8080

COPY --from=build /app/target/schoolweb-backend-0.0.1-SNAPSHOT.jar /app/app.jar

EXPOSE 8080

# Render provides PORT env; pass it to Spring via -Dserver.port
ENTRYPOINT ["/bin/sh","-c","exec java $JAVA_OPTS -Dserver.port=$PORT -jar /app/app.jar"]


