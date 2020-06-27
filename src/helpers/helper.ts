export default class Helper {
    //Helper for delete item
    deleteItem = (items: any[], element: { id: any }): any[] =>{
        return items.filter((item)=>{
            if(item.id !== element.id){
                return item
            }
        });
    };
    //Helper for generate id
    generateId = () =>{
        const currentDate: object = new Date();
        return currentDate.getTime()+2;
    };
}