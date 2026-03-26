import { Resolver, Query, ResolveReference } from '@nestjs/graphql';
import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType('Product')
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;
}

@Resolver('Product')
export class ProductsResolver {
  private productsData: Product[] = [
    { id: '1', name: 'iPhone', price: 1000 },
    { id: '2', name: 'Laptop', price: 2000 },
  ];

  @Query(() => [Product], { nullable: true })
  products(): Product[] {
    return this.productsData;
  }

  @ResolveReference()
  resolveReference(ref: { id: string }): Product | undefined {
    return this.productsData.find(p => p.id === ref.id);
  }
}
