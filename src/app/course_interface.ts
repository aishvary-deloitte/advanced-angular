
export interface CourseInterface{
  id: string;
  title: string;
  course_creator: string;
  tags: string[];
  price: number;
  discount: number;
  cart: boolean;
  wishlist: boolean;
  discounted_price:number;
}

