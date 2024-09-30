import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
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

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    const product = this.productRepo.create({ ...productData, category });
    return this.productRepo.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: updateProductDto.categoryId },
      });
      product.category = category;
    }

    Object.assign(product, updateProductDto);
    return this.productRepo.save(product);
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
