package vn.vti.clothing_shop.configs;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info =@Info(
                title = "VTI Clothing Shop API",
                version = "v0.0",
                contact = @Contact(
                        name = "Thái Ngọc Rạng", email = "thaingocrang2014@gmail.com", url = "https://www.google.com"
                ),
                license = @License(
                        name = "Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
                ),
                termsOfService = "https://www.google.com",
                description = "API for VTI Clothing Shop"
        ),
        servers = @Server(
                url = "http://localhost:8080/",
                description = "VTI Clothing Shop"
        )
)
@SecurityScheme(
        name = "Bearer Authentication",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class OpenAPISecurityConfiguration {
}
