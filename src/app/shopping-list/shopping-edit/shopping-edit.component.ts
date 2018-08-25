import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
// @ViewChild ('nameInput') nameInputRef: ElementRef;
// @ViewChild ('amountInput') amountRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') shopListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListServ: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListServ.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListServ.getIngredient(index);
        this.shopListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );

  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountRef.nativeElement.value; /*(generally we create object with 'let' keyword,
    // if you are var is not changed then we can use const keyword )*/
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListServ.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListServ.addIngredient(newIngredient);
      // this.ingredientAdded.emit(newIngredient);
    }
  }
  onClear() {
    this.shopListForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListServ.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
