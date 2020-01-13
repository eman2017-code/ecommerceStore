import {
  FETCH_SINGLE_PRODUCT,
  CHANGE_CURRENCY,
  RECEIVE_PRODUCTS,
  RECEIVE_CATEGORY_PRODUCTS
} from "../constants/ActionTypes";

const initialState = {
  products: [],
  symbol: "$",
  product_details: [],

  // trending product categories
  computersAndTablets: [],
  cellPhones: [],
  headphones: [],
  appliances: []
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return { ...state, products: action.products };

    case RECEIVE_CATEGORY_PRODUCTS:
      const categoryNameArray = action.category.split(" ");

      // the action.category parameter contains the category name with spaces, and
      // the [categoryName] syntax is used to set the category with its products in state,
      // so this .map() converts the category name with spaces to the category name using
      // camel-case format.
      // *** AKA: nobody touch this code without talking to Mitch first ***
      const formattedCategoryNameArray = categoryNameArray.map((word, i) => {
        if (i > 0) {
          const wordArray = word.split("");
          const firstLetterCapitalized = wordArray[0].toUpperCase();

          delete wordArray[0];
          wordArray[0] = firstLetterCapitalized;

          const newWord = wordArray.join("");
          return newWord;
        }
        return word;
      });

      // joins the array of words
      const formattedCategoryName = formattedCategoryNameArray.join("");

      return {
        ...state,
        [formattedCategoryName]: action.products
      };

    case FETCH_SINGLE_PRODUCT:
      if (
        state.products.findIndex(
          product => product.sku === action.productId
        ) !== -1
      ) {
        const singleItem = state.products.reduce((itemAcc, product) => {
          return product;
        }, []);
        return { ...state, product_details: singleItem };
      }
    // case FETCH_SINGLE_PRODUCT:
    //   // itterate through the products array
    //   const singleItem = state.data.products.filter(
    //     product => product.sku === action.productId
    //   );
    //   // grab the first (and only one) that meets the requirements out of array
    //   const matchingProduct = singleItem[0];
    //   // put that item in the products_details array
    //   return { ...state, product_details: matchingProduct };

    case CHANGE_CURRENCY:
      return { ...state, symbol: action.symbol };
    default:
      return state;
  }
};
export default productReducer;
