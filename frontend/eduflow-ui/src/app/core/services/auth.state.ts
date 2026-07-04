import { computed, Injectable, signal } from "@angular/core";


@Injectable({
    providedIn : 'root'
})

export class AuthStateService{

    private token = signal<string | null>(localStorage.getItem('token'));
    
    isLoggedIn = computed(() => !!this.token());

    setToken(token : string) :void{
        localStorage.setItem('token',token);
        this.token.set(token);
    }

    logout() : void {
        localStorage.removeItem('token');
        this.token.set(null);
    }






}