import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Accommodation API')
    .setDescription('The accommodation API description')
    .setVersion('1.0')
    .addTag('accommodations') 
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document); 

  await app.listen(8000);
}
bootstrap();
