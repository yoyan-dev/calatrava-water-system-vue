import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Resident } from '@/types/resident'


const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

export const useResidentStore = defineStore('resident', () => {
  const residents = ref<Resident[]>([]);

  function fetchResidents () {
    residents.value = []
    residents.value.push({
        id: '1',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Doe',
        waterBill: 100
    })

    return residents.value
  } 

  function createResident(newResidents: Resident) {
    if (newResidents) {
      newResidents.id = createId(); 
      residents.value.push({waterBill: 10, ...newResidents}); 
    }
  }

  function updateResident(residentData: Resident) {
    if (residentData.id) {
        residents.value[findIndexById(residentData.id)] = residentData;
    }
  }
  
  function deleteResident (id: string) {
    if(id) {
        residents.value = residents.value.filter((val) => val.id !== id);
    }
  }

  const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < residents.value.length; i++) {
            if (residents.value[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

  return { fetchResidents, createResident, updateResident, deleteResident };
});
