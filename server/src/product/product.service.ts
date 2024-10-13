import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { CloudinaryService } from './cloudinary.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async findAll() {
    return this.productRepo.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(createProductDto: any, file?: Express.Multer.File) {
    console.log(
      `Creating product with DTO: ${JSON.stringify(createProductDto)}`,
    );

    let uploadedImage = null;
    if (file) {
      uploadedImage = await this.cloudinaryService.uploadImage(file);
    }

    const category = createProductDto.categoryId
      ? await this.categoryRepo.findOne({
          where: { id: parseInt(createProductDto.categoryId) },
        })
      : null;

    const product = this.productRepo.create({
      ...createProductDto,
      category,
      files: uploadedImage,
      content: createProductDto.content
        ? JSON.parse(createProductDto.content)
        : null,
    });

    try {
      const savedProduct = await this.productRepo.save(product);
      return savedProduct;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductDto: any, file?: Express.Multer.File) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    // Handle file upload if a new file is provided
    if (file) {
      const uploadedImage = await this.cloudinaryService.uploadImage(file);
      product.file = uploadedImage;
    }

    // Update other fields
    if (updateProductDto.title) product.title = updateProductDto.title;
    if (updateProductDto.slug) product.slug = updateProductDto.slug;
    if (updateProductDto.status) product.status = updateProductDto.status;
    if (updateProductDto.date) product.date = updateProductDto.date;
    if (updateProductDto.content) {
      product.content = JSON.parse(updateProductDto.content);
    }

    // Handle category update
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: parseInt(updateProductDto.categoryId) },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateProductDto.categoryId} not found`,
        );
      }
      product.category = category;
    }

    console.log(`Updating product: ${JSON.stringify(product)}`);

    try {
      const savedProduct = await this.productRepo.save(product);
      console.log(
        `Product updated successfully: ${JSON.stringify(savedProduct)}`,
      );
      return savedProduct;
    } catch (error) {
      console.error(`Error updating product: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepo.findOne({
      where: { id: parseInt(id) },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    await this.productRepo.remove(product);
  }
}
