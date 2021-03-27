const STORAGE_DATA = "storage_data"

export function setData(zoom){
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_DATA, JSON.stringify(zoom));
    }
};
  
export function getData(){
    if (typeof localStorage !== 'undefined') {
        let data = localStorage.getItem(STORAGE_DATA);
        return JSON.parse(data);
    }
};