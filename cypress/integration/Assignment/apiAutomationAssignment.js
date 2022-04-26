/// <reference types = "cypress"/>

describe('api assignment', ()=>{

    let data  
    beforeEach(()=>{

    cy.fixture('example').then((value)=>{
        data=value
    })

})

   
	 it('Task 1',()=>{

        let responseFirstName , responseLastName , responseEmail
        
        token = data.token
        responseFirstName = 'rohith'
        responseLastName = 'dornala'
        responseEmail = 'rohith@d.com'

        cy.request({
            method : 'GET',
            url : `${Cypress.config('baseUrl')}${Cypress.env('api').users}`,

            headers : {
                Authorization : data.token
            }
    }).then((resposne)=>{
        let keyValues = ['rohith','dornala','rohith@d.com']
            
           
            expect(resposne.body).have.property('firstName').to.equal(responseFirstName)
            expect(resposne.body).have.property('lastName').to.equal(responseLastName)
            expect(resposne.body).have.property('email').to.equal(responseEmail)
          
            

           
        })

        

     })


   
 	it('Task 2',()=>{
        
     cy.request({
            method : 'GET',
            url : `${Cypress.config('baseUrl')}${Cypress.env('api').users}`,
            
            headers : {
                Authorization : data.token
            }
        })
        .then((response)=>{
            ['firstName','lastName','email'].forEach(property => {
                expect(response.body).have.property(property).not.to.undefined.not.to.empty
            })
        })
    
        
        


        
    })


    it('Task 3',()=>{
        let responseFirstName , responseLastName , responseEmail
      
        token = data.token
        responseFirstName = 'rohith'
        responseLastName = 'dornala'
        responseEmail = 'rohith@d.com'

        cy.request({
            method : 'GET',
            url : `${Cypress.config('baseUrl')}${Cypress.env('api').users}`,

            headers : {
                Authorization : data.token
            }
        }).then((resposne)=>{

           
         
            expect(resposne.body).have.property('firstName').to.equal(responseFirstName)
            expect(resposne.body).have.property('lastName').to.equal(responseLastName)
            expect(resposne.body).have.property('email').to.equal(responseEmail)
          



           
        })

    })


    it('task 4',()=>{
     
     const endPoint = data.contactID

        
        cy.request({
            method : 'GET',
            url : `${Cypress.config('baseUrl')}${Cypress.env('api').contact}`+endPoint,
         
            headers : {
                Authorization : data.token
            },

            body : data.addContactBody
           
        })
        .then((response)=>{

            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('firstName').to.equal(data.addContactBody.firstName)
            expect(response.body).have.property('lastName').to.equal(data.addContactBody.lastName)
            expect(response.body).have.property('email').to.equal(data.addContactBody.email)
        })
    })


    it.only('task 5',()=>{
        
        const endPoint = data.contactID
        cy.request({
            method : 'GET',
            url : `${Cypress.config('baseUrl')}${Cypress.env('api').contact}`+endPoint,
          
         
            headers : {
                Authorization : data.token
            }
           
        }).then((response)=>{

            expect(response.status).to.equal(200)
           expect(response.body).to.contains('Contact deleted')
            
           cy.request({
            method : 'GET',
            url : `${Cypress.config('baseUrl')}${Cypress.env('api').contact}`+endPoint,
          
         
            headers : {
                Authorization : data.token
            }
           
        }).then((response)=>{
            expect(response.status).to.equal(404)


        })


         

        })
       
    })







})