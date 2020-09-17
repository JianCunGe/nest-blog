import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model';
import { Crud } from 'nestjs-mongoose-crud';

// Data Transfer Object
class CreateDto {
    @ApiProperty({title: '帖子标题', example: '标题1'})
    @IsNotEmpty({message: '请填写标题'})
    title: string

    @ApiProperty({title: '帖子内容', example: '内容1'})
    @IsNotEmpty({message: '请填写内容'})
    content: string
}

@Crud({
    model: PostSchema,
    routes: {
        find: {
            decorators: [
                ApiOperation({summary: '获取帖子'})
            ]
        },
        create: {
            dto: CreateDto
        }
    }
})

@Controller('posts')
@ApiTags('博客相关')
export class PostsController {
    constructor(@InjectModel(PostSchema) private readonly model: ModelType<PostSchema>) {}

    // @ApiOperation({summary: '获取博客列表'})
    // @Get()
    // async index() {
    //     return await this.postModel.find() 
    // }

    // @ApiOperation({summary: '创建Blog'})
    // @Post()
    // async create(@Body() postData: CreateDto, @Query() query, @Param() params) {
    //     await this.postModel.create(postData)
    //     return {
    //         success: true
    //     }
    // }

    // @ApiOperation({summary: 'Blog详情'})
    // @Get(':id')
    // async detail(@Param('id') id: string) {
    //     return await this.postModel.findById(id)
    // }

    // @ApiOperation({summary: '更新Blog'})
    // @Put(':id')
    // async update(@Param('id') id: string, @Body() updatePostDto: CreateDto) {
    //     await this.postModel.findByIdAndUpdate(id, updatePostDto)
    //     return  {
    //         success: true
    //     }
    // }

    // @ApiOperation({summary: '更新Blog'})
    // @Delete(':id')
    // async remove(@Param('id') id: string) {
    //     await this.postModel.findByIdAndDelete(id)
    //     return {
    //         success: true
    //     }
    // }
}
