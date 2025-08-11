import {create} from 'zustand';
import axios from 'axios';
import toast from "react-hot-toast";

const BASE_URL= 'http://localhost:3000';
//Product store items fetching
export const useProductStore = create((set, get) => ({
//products state management

products:[],
loading: false,
error:null,

fetchProducts: async () => {

    set({loading: true});

    try{
        const response = await axios.get(`${BASE_URL}/api/products`)
        
        set({products: response.data.data, error:null});
    }catch(err){
        if(err.status==429)
            set({error:"Rate limit exceeded"});
        else
            set({error: "Something goes wrong"});
    }finally{

        set({loading: false});
    }

},

deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
      toast.success("Product deleted successfully"); //notification pop up with message 
    } catch (error) {
      console.log("Error with product deletion", error);
      toast.error("Something went wrong"); //notification pop up with message 
    } finally {
      set({ loading: false });
    }
},

}));