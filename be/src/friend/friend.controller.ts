import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { AddFriendDto } from "./dto/add-friend.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { Token } from "src/utils/token.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("친구")
@Controller("/api/friend")
@UseGuards(AuthGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  @ApiOperation({ summary: "친구 추가" })
  @Post("/add")
  async add(@Token() token: string, @Body() dto: AddFriendDto): Promise<JSON> {
    const result = await this.friendService.add(token, dto);
    return JSON.parse(result);
  }

  @ApiOperation({ summary: "친구 목록 조회" })
  @Get("/")
  async getAllFriends(@Token() token: string) {
    const result = await this.friendService.getAllFriends(token);
    return JSON.parse(result);
  }
}
