import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.get<string>('MQTT_URL'),
            username: configService.get<string>('MQTT_USERNAME'),
            password: configService.get<string>('MQTT_PASSWORD'),
            clientId: `${configService.get<string>('MQTT_CLIENTID_PREFIX')}${Math.random().toString(16).slice(2)}`,
            subscribeOptions: {
              qos: 1,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [MqttController],
})
export class MqttModule {}
