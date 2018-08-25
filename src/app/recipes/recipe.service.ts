import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import index from '@angular/cli/lib/cli';

@Injectable() /* this method is used to get the shopping-list service in a recipe service */
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Chicken Curry',
      'A Super-Tasty Chicken Curry',
      'http://www.rajnisrecipe.com/wp-content/uploads/2016/10/curdchickenrecipe.jpg' ,
      [
        new Ingredient('Chicken' , '1 LB'),
        new Ingredient('All Spices' , ' 1 table spoon ')
      ]),
    new Recipe('Mutton Curry',
      'What else you need to say?',
      'https://i.ytimg.com/vi/mzbAqmhqlKA/hqdefault.jpg' ,
      [
        new Ingredient('Mutton' , '1 LB'),
        new Ingredient('All Spices' , '1 table spoon')
      ])
  ];
  constructor(private shoppingListService: ShoppingListService) {

  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes[id];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
