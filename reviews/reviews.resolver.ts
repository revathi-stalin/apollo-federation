import { Resolver, Query } from '@nestjs/graphql';
import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType('Review')
export class Review {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  rating: number;

  @Field()
  comment: string;
}

@Resolver('Review')
export class ReviewsResolver {
  private reviewsData: Review[] = [
    { id: '1', productId: '1', rating: 5, comment: 'Great!' },
  ];

  @Query(() => [Review], { nullable: true })
  reviews(): Review[] {
    return this.reviewsData;
  }
}
