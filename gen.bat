@echo off
REM Define the URL to download the YAML file
set "YAML_URL=http://localhost:8080/v3/api-docs.yaml"

REM Define the destination for the downloaded YAML file
set "YAML_FILE=api-docs.yaml"

REM Use curl to download the YAML file (included in recent Windows versions or install curl if not available)
echo Downloading the YAML file...
curl -o %YAML_FILE% %YAML_URL%

REM Check if the YAML file was downloaded successfully
if not exist %YAML_FILE% (
    echo Failed to download the YAML file.
    exit /b 1
)

REM Run the npx openapi-generator-cli command with the downloaded YAML file
echo Running the OpenAPI generator...
npx openapi-generator-cli generate -i %YAML_FILE% -o src/network/openapi --skip-validate-spec -g typescript-fetch --additional-properties=supportsES6=true,npmVersion=10.7.0,typescriptThreePlus=true

REM Check if the command succeeded
if %errorlevel% neq 0 (
    echo OpenAPI generator command failed.
    exit /b 1
)

echo OpenAPI generation completed successfully.
