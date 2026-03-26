import { Resolver, Query } from '@nestjs/graphql';
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

@ObjectType('Order')
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  quantity: number;
}

@ObjectType('OrderWithProduct')
export class OrderWithProduct {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Product, { nullable: true })
  product?: Product;
}

@Resolver('Order')
export class OrdersResolver {
  private ordersData: Order[] = [
    { id: '1', productId: '1', quantity: 2 },
  ];

  // Simulated product data
  private productsData: Product[] = [
    { id: '1', name: 'iPhone', price: 1000 },
    { id: '2', name: 'Laptop', price: 2000 },
  ];

  @Query(() => [Order], { nullable: true })
  orders(): Order[] {
    return this.ordersData;
  }

  @Query(() => [OrderWithProduct], { nullable: true })
  ordersWithProducts(): OrderWithProduct[] {
    return this.ordersData.map(order => ({
      id: order.id,
      quantity: order.quantity,
      product: this.productsData.find(p => p.id === order.productId)
    }));
  }
}
