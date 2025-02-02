import categoryService from "@/services/categorySerivce";
import sweetAlert from "@/tools/sweetAlert";
import page from "page";

const categoryModal = () => {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center`
    modal.innerHTML = `<form id='formModal' class="bg-gray-900 rounded-sm w-full max-w-md mx-4 border border-purple-500/30">
                        <div class="p-6 border-b border-purple-500/20">
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Add Category</h2>
                        </div>
                        <div class="p-6 space-y-6 bg-gradient-to-b from-gray-900 to-black">
                            <div class="space-y-2">
                            <label for="category" class="block text-sm font-medium text-purple-300">Category Name</label>
                            <input type="text" name="category" class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            </div>
                        </div>
                        <div class="p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40">
                            <button id='closeBtn' class="px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all">Cancel</button>
                            <button class="px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all">Add Category</button>
                        </div>
                        </form>`;

    return modal;
}

export const handleCategory = () => {
    const modal = categoryModal();
    document.body.appendChild(modal);

    const form = modal.querySelector('#formModal') as HTMLFormElement;
    const closeBtn = modal.querySelector('#closeBtn') as HTMLButtonElement;

    const closeModal = () => {
        modal.remove();
    }

    if (closeBtn){
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click' , (e:Event) => {
        if (e.target === modal) closeModal();
    });

    if (form){
        form.addEventListener('submit', async (e:Event) => {
            e.preventDefault();


            const data = new FormData(form) as FormData;
            const name = data.get('category') as string;

            if (name.length > 1){
                try {
                    const reponse = await categoryService.createCategory({name});

                    if (reponse.status === 200){
                        sweetAlert('Category created');
                        closeModal();
                    } else {
                        sweetAlert('Failed to create category');
                    }

                } catch (err){
                    sweetAlert('an error occurred. please try again');
                    page('/404');
                }
            } else {
                sweetAlert('Please enter a valid category name')
            }
        })
    }
}