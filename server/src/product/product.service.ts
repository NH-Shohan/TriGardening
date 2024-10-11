import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { CloudinaryService } from './cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const { categoryId, ...productData } = createProductDto;

    const uploadedImage = await this.cloudinaryService.uploadImage(file);

    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });

    const product = this.productRepo.create({
      ...productData,
      category,
      files: uploadedImage,
    });

    return this.productRepo.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.title) {
      product.title = updateProductDto.title;
    }

    if (updateProductDto.slug) {
      product.slug = updateProductDto.slug;
    }

    if (updateProductDto.status) {
      product.status = updateProductDto.status;
    }

    if (updateProductDto.files) {
      product.files = updateProductDto.files;
    }

    if (updateProductDto.content) {
      product.content = updateProductDto.content;
    }

    if (updateProductDto.date) {
      product.date = updateProductDto.date;
    }

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: updateProductDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateProductDto.categoryId} not found`,
        );
      }
      product.category = category;
    }

    const savedProduct = await this.productRepo.save(product);

    return savedProduct;
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
