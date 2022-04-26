describe('RohithAssignment',()=>{
    beforeEach(()=>{
           cy.visit('http://automationpractice.com/index.php')
   
       })
   
   

       it('CASE 1.1 , Element not found assesetion',()=>{
          
         let searchInput = ['p','pr']

            searchInput.forEach((input)=>{
            cy.get('#search_query_top',{timeout : 8000}).type(input)
            .get('.ac_results',{timeout : 8000}).should('not.exist')
            .get('#search_query_top').clear()

         })
   
   
       })
   
   

       it('CASE 1.2, Element  found assesetion',()=>{
          
            const searchInput = ['pri','pri']
            searchInput.forEach((input)=>{

                cy.get('#search_query_top',{timeout : 8000}).type(input)
                .get('.ac_results',{timeout : 8000}).should('be.visible')
                .get('#search_query_top').clear()
       


            })
        })
   
   

       it('Case 2, Validate results are displayed according to the search made by the user',()=>{
           const userInput = 'Blouse'
         
           cy.get('#search_query_top')
           .type(userInput,'{enter}')
           .type('{enter}')
           .get('.product_list',{timeout : 8000})
           .find('[class="product-name"]').then((textP)=>{
   
             const  getProductName = textP.text()
             cy.wrap(userInput).should('eq', getProductName)
             
           })
       })
   
   

   
       it('Case 3 , Validate whether the user is able to apply the large size catalog filter for the T-shirt section',()=>{
   
          
           cy.get('.sf-menu > :nth-child(3) > a',{timeout : 8000}).click()
           .get('#layered_id_attribute_group_3',{timeout : 8000}).should('be.enabled').check().should('be.checked')
   
       })
   
       it('Case 4 ,Validate whether the user is able to upload  a file on the contact us page', ()=>{
   
          
           cy.get('#contact-link > a')
           .click()
   
          .get('#fileUpload',{timeout:8000}).selectFile('cypress/integration/Assignment/hello.png')
           .get('[class="filename"]',{timeout:8000}).should('contain','hello.png')
       })
   
   

       it.only('Add 5 products in the cart, validate total cart amount and individual product price both with and without discount.',()=>{
   
            for(let i=0 ; i<=4;i++){
               cy.get('#homefeatured>li').eq(i)
               .contains('Add to cart').click()
               .get('span.cross',{timeout:8000}).click()
            }
            cy.get('[title="View my shopping cart"]',{timeout:8000}).click()
   
            .get('.cart_unit>span').each(($el)=>{
   
                let unitPrice = $el.find('.price').text()
               console.log(unitPrice)
               cy.get('[data-title="Total"]').then(($el2)=>{
   
               let singleItemTotal =  $el2.find('.price').text()
   
               cy.wrap(unitPrice).should('eq', singleItemTotal)

   
            })
   
   
   
   
   
   
        })
   
   
   
    })
   
   
   
})