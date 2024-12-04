import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MqttContext, Payload } from '@nestjs/microservices';

@Controller()
export class MqttController {
  @EventPattern('machine/vm/status')
  handleDeviceStatus(
    @Payload() data: string,
    @Ctx() context: MqttContext,
  ): void {
    console.log('Received device status:', data);
    // console.log('Context:', context);
    console.log('options', context.getPacket());
    // Add your business logic for handling the "device/status" topic
  }
}
