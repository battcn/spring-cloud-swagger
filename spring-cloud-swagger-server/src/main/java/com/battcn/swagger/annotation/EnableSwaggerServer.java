package com.battcn.swagger.annotation;

import com.battcn.swagger.SwaggerServerAutoConfiguration;
import org.springframework.context.annotation.Import;

import java.lang.annotation.*;

/**
 * @author 唐亚峰
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import({SwaggerServerAutoConfiguration.class})
public @interface EnableSwaggerServer {


}