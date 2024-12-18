---
outline: deep
title: 实现服务注册与发现(Nacos)
date: 2024-02-20
---

[[toc]]

## 1、开发环境
<table>
    <tr>
        <th>Nacos</th>
        <td>2.2.3</td>
    </tr>
    <tr>
        <th>Maven</th>
        <td>3.8.2</td>
    </tr>
    <tr>
        <th>SpringCloudAlibaba</th>
        <td>2022.0.0.0</td>
    </tr>
    <tr>
        <th>SpringBoot</th>
        <td>3.2.0</td>
    </tr>
    <tr>
        <th>Java</th>
        <td>17</td>
    </tr>
    <tr>
        <th>SpringCloud</th>
        <td>2023.0.0-RC1</td>
    </tr>
</table>

## 2、准备工作
### 2.1、 下载Nacos
### 2.2、 启动Nacos

Linux/Unix/Mac

启动命令(standalone代表着单机模式运行，非集群模式):
```
sh startup.sh -m standalone
```
如果您使用的是ubuntu系统，或者运行脚本报错提示[[符号找不到，可尝试如下运行：
````
bash startup.sh -m standalone
````
Windows
启动命令(standalone代表着单机模式运行，非集群模式):
```
startup.cmd -m standalone
```

![nacosStast.png](https://s2.loli.net/2024/02/21/uk4B2oP5CXpvwyY.png)

## 3、工程创建
### 3.1、使用maven创建父工程(删除src文件) pom.xml文件如下
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.su</groupId>
    <artifactId>SpringCloud_Two</artifactId>
    <version>1.0-SNAPSHOT</version>

    <!--Maven 属性，定义了一些配置属性-->
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <java.version>17</java.version> <!--java 版本-->
        <spring-cloud.version>2023.0.0-RC1</spring-cloud.version> <!--Spring Cloud 版本-->
        <spring-cloud-alibaba.version>2022.0.0.0</spring-cloud-alibaba.version> <!--Spring Cloud Alibaba 版本-->
        <spring-boot-version>3.2.0</spring-boot-version>
    </properties>

    <!-- 定义了依赖的管理信息 -->
    <dependencyManagement>
        <dependencies>
            <!-- SpringBoot的依赖配置-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot-version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!-- SpringCloud的依赖配置-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <!-- 指定 Spring Cloud 的版本 -->
                <version>${spring-cloud.version}</version>
                <!-- Project Object Model 这表示它不包含实际的库，而是用于管理其他依赖的版本 -->
                <type>pom</type>
                <!-- 这个依赖的作用范围为 import，表示该依赖仅用于 Maven 的依赖管理，而不会直接参与项目的编译和运行 -->
                <scope>import</scope>
            </dependency>

            <!-- spring-cloud-alibaba 依赖管理 -->
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${spring-cloud-alibaba.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

        </dependencies>
    </dependencyManagement>

    <modules>
        <module>spring-provider</module>
        <module>spring-consumer</module>
    </modules>

    <packaging>pom</packaging>

    <repositories>
        <!-- 仓库配置的具体仓库 -->
        <repository>
            <!-- 仓库的唯一标识 -->
            <id>spring-milestones</id>
            <!-- 仓库的名字 -->
            <name>Spring Milestones</name>
            <!-- 仓库的地址 -->
            <url>https://repo.spring.io/milestone</url>
            <!-- 配置是否启用快照版本 -->
            <snapshots>
                <!-- 禁用快照版本，即不从该仓库获取快照版本 -->
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>
</project>
```

### 3.2、创建spring-provider与spring-consumer子工程
#### 3.2.0、spring-provider -> pom.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.su</groupId>
        <artifactId>SpringCloud_Two</artifactId>
        <version>1.0-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.su</groupId>
    <artifactId>spring-provider</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>spring-provider</name>
    <description>spring-provider</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <!-- Spring web Starter -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring cloud bootstrap SpringCloud 2020.* 版本把bootstrap移除导致读取不到 bootstrap.properties.-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bootstrap</artifactId>
        </dependency>

        <!-- Spring cloud Starter -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter</artifactId>
        </dependency>

        <!-- nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>

        <!-- 服务提供消费 -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <!-- openfeign -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```
#### 3.2.1、在spring-provider工程中添加bootstrap.properties文件
``` properties
server.port=8070
spring.application.name=service-provider
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

```
#### 3.2.2、修改启动器以提供服务注册功能
``` java
package com.su.springprovider;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
//提供服务注册功能
@EnableDiscoveryClient
public class SpringProviderApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringProviderApplication.class, args);
    }


    @RestController
    static class EchoController {
        @RequestMapping(value = "/echo/{string}", method = RequestMethod.GET)
        public String echo(@PathVariable(name = "string")  String string) {
            System.out.println(string);
            return "Hello Nacos Discovery " + string;
        }
    }
}

```
#### 3.2.3、spring-consumer -> pom.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.su</groupId>
        <artifactId>SpringCloud_Two</artifactId>
        <version>1.0-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.su</groupId>
    <artifactId>spring-consumer</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>spring-consumer</name>
    <description>spring-consumer</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>

        <!--解决：Did you forget to include spring-cloud-starter-loadbalancer?-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-loadbalancer</artifactId>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```
#### 3.2.4、 在spring-consumer的application.properties添加
``` properties
spring.application.name=service-consumer
server.port=18082
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
```

#### 3.2.5、新建EchoService
``` java
package com.su.springconsumer;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "service-provider")
public interface EchoService {
    @RequestMapping(value = "/echo/{str}", method = RequestMethod.GET)
    String echo(@PathVariable(name = "str") String str);
}
```
#### 3.2.6、新建TestController
``` java
package com.su.springconsumer;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class TestController {

    private final RestTemplate restTemplate;
    private final EchoService echoService;

    public TestController(RestTemplate restTemplate, EchoService echoService) {
        this.restTemplate = restTemplate;
        this.echoService = echoService;
    }

    @RequestMapping(value = "/echo-rest/{str}", method = RequestMethod.GET)
    public String rest(@PathVariable(name = "str") String str) {
        return restTemplate.getForObject("http://service-provider/echo/" + str,
                String.class);
    }

    @RequestMapping(value = "/echo-feign/{str}", method = RequestMethod.GET)
    public String feign(@PathVariable(name = "str") String str) {
        return echoService.echo(str);
    }

}
```
#### 3.2.7、修改启动器
``` java
package com.su.springconsumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class SpringConsumerApplication {

    @LoadBalanced
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringConsumerApplication.class, args);
    }

}
```
#### 3.2.8 启动spring-provider与spring-consumer

## 4、测试
#### 4.1、服务列表
在浏览器打开(http://127.0.0.1:8848/nacos)可以看见
![nacosHome.png](https://s2.loli.net/2024/02/21/UxcZRltFzoAQb6Y.png)
在左侧导航栏中打开服务管理/服务列表可以看见我们的两个服务
![nacosCloud.png](https://s2.loli.net/2024/02/21/R6f5hsq3u9yEMiz.png)
#### 4.2、测试服务
浏览器打开
```
http://127.0.0.1:18082/echo-rest/rest-rest
http://127.0.0.1:18082/echo-feign/feign-rest
```

![nacosRest.png](https://s2.loli.net/2024/02/21/9RPL5QWuIfmGnK3.png)
![nacosFeign.png](https://s2.loli.net/2024/02/21/X6AlNZvq9URhJfG.png)

可以发现spring-consumer消费了spring-provider提供的服务