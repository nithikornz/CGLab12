#version 330 core

in vec4 vCol;
in vec2 TexCoord;
out vec4 colour;
in vec3 Normal;
in vec3 FragPos;

uniform sampler2D texture2D;

uniform vec3 lightColour;
uniform vec3 lightPos;
uniform vec3 viewPos;

vec3 ambientLight()
{
    float ambientStrength = 0.2f;
    vec3 ambient = lightColour * ambientStrength;
    return ambient;
}

vec3 diffuseLight()
{   
    float diffuseStrength = 0.5f;
    
    //diffuse light = normal dot light direction
    //light direction = light position - fragment position
    //fragment position = position of the vertex in world space

    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 norm = normalize(Normal);

    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diffuseStrength * diff * lightColour;
    return diffuse;
}

vec3 specularLight()
{
    float specularStrength = 0.8f;
    float shininess = 64.0f;

    vec3 lightDir = normalize(lightPos - FragPos);
    vec3 norm = normalize(Normal);
    vec3 reflectDir = reflect(-lightDir, norm);
    vec3 viewDir = normalize(viewPos - FragPos);

    float spec = pow(max(dot(viewDir, reflectDir), 0.0f), shininess);

    vec3 specular = lightColour * spec * specularStrength;
    return specular;
}

void main()
{   
    //phong = ambient + diffuse + specular
    colour = texture(texture2D, TexCoord) * vec4(ambientLight() + diffuseLight() + specularLight(), 1.0f);
}