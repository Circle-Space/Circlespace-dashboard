class BookARoomManagement {
    constructor() {
      this.userId = null;
      this.fiscalYear = '2033';
      this.data = null;
      this.wizard = null;
      this.currentTabIndex = 0;
    }
  
    async init() {
      // Fetch user context from Power Pages
      this.userId = await this.getUserContext();
  
      this.wizard = {
        tabs: [
          {
            tabName: "account",
            tabDisplayName: "Account",
            tabType: "NextOnly",
            tabActiveColor: "bg-blue-200",
            tabInActiveColor: "bg-gray-200",
            nextAction: () => this.navigateNext(),
            prevAction: null,
            fields: [
              {
                logicalName: "email",
                label: "Your Email",
                inputType: "email",
                required: true,
                errorMessage: "Valid email is required."
              },
              {
                logicalName: "password",
                label: "Your Password",
                inputType: "password",
                required: true,
                errorMessage: "Password is required."
              },
              {
                logicalName: "country",
                label: "Country",
                inputType: "text",
                required: true,
                errorMessage: "Country is required."
              },
              {
                logicalName: "dailyBudget",
                label: "Daily Budget",
                inputType: "number",
                required: true,
                errorMessage: "Daily budget is required."
              }
            ]
          },
          // Add more tabs as needed
        ]
      };
  
      this.renderWizard();
    }
  
    async getUserContext() {
      // Use Power Pages API to get user context
      // This is a placeholder - replace with actual Power Pages method
      return "user123";
    }
  
    renderWizard() {
      const wizardContainer = document.getElementById('wizard-container');
      wizardContainer.innerHTML = ''; // Clear existing content
  
      // Render tabs
      const tabsHtml = this.wizard.tabs.map((tab, index) => `
        <div class="tab ${index === this.currentTabIndex ? tab.tabActiveColor : tab.tabInActiveColor} p-4 cursor-pointer"
             onclick="bookARoomManager.selectTab(${index})">
          ${tab.tabDisplayName}
        </div>
      `).join('');
  
      // Render fields for current tab
      const currentTab = this.wizard.tabs[this.currentTabIndex];
      const fieldsHtml = currentTab.fields.map(field => `
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="${field.logicalName}">
            ${field.label}${field.required ? ' *' : ''}
          </label>
          <input type="${field.inputType}" id="${field.logicalName}" name="${field.logicalName}"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 ${field.required ? 'required' : ''}>
          <p class="text-red-500 text-xs italic hidden">${field.errorMessage}</p>
        </div>
      `).join('');
  
      // Render navigation buttons
      const navButtonsHtml = `
        <div class="flex justify-between mt-4">
          ${this.currentTabIndex > 0 ? `<button onclick="bookARoomManager.navigatePrevious()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Previous</button>` : ''}
          ${this.currentTabIndex < this.wizard.tabs.length - 1 ? `<button onclick="bookARoomManager.navigateNext()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>` : ''}
          ${this.currentTabIndex === this.wizard.tabs.length - 1 ? `<button onclick="bookARoomManager.submitForm()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>` : ''}
        </div>
      `;
  
      wizardContainer.innerHTML = `
        <div class="max-w-xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="flex mb-4">${tabsHtml}</div>
          <form id="wizard-form">
            ${fieldsHtml}
            ${navButtonsHtml}
          </form>
        </div>
      `;
    }
  
    selectTab(index) {
      if (index !== this.currentTabIndex) {
        this.currentTabIndex = index;
        this.renderWizard();
      }
    }
  
    navigateNext() {
      if (this.validateCurrentTab()) {
        this.currentTabIndex++;
        this.renderWizard();
      }
    }
  
    navigatePrevious() {
      if (this.currentTabIndex > 0) {
        this.currentTabIndex--;
        this.renderWizard();
      }
    }
  
    validateCurrentTab() {
      const currentTab = this.wizard.tabs[this.currentTabIndex];
      let isValid = true;
  
      currentTab.fields.forEach(field => {
        const input = document.getElementById(field.logicalName);
        const errorElement = input.nextElementSibling;
  
        if (field.required && !input.value) {
          isValid = false;
          errorElement.classList.remove('hidden');
        } else {
          errorElement.classList.add('hidden');
        }
      });
  
      return isValid;
    }
  
    async submitForm() {
      if (this.validateCurrentTab()) {
        const formData = new FormData(document.getElementById('wizard-form'));
        const data = Object.fromEntries(formData.entries());
  
        try {
          // Use Power Pages API to submit data
          // This is a placeholder - replace with actual Power Pages method
          await this.submitToPowerPages(data);
          alert('Form submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('An error occurred while submitting the form. Please try again.');
        }
      }
    }
  
    async submitToPowerPages(data) {
      // Placeholder for Power Pages submission logic
      console.log('Submitting data to Power Pages:', data);
      // In a real implementation, you would use Power Pages' WebAPI or form submission methods
    }
  }
  
  // Initialize the manager
  const bookARoomManager = new BookARoomManagement();
  bookARoomManager.init();

  //https://www.lewisdoes.dev/blog/import-a-javascript-library-to-use-with-a-power-pages-webpage/