# Virtual Thrift Platform with AI Virtual Try-on


## 1. Project Title
**Thrift-and-Go**



## 2. Basic Details

### **Team Name:**  
Style Syndicate

### **Team Members:**  
- Devika P Sajith  
- Roshan Roshin
- Pavithra Deepu E
- Ashna Thajudheen 

### **Track / Theme:**  
Sustainability & Circular Fashion

### **Problem Statement:**  
Social Reselling Platform: A social-first marketplace for swapping, reselling, and upcycling garments.

### **Solution Overview:**  
A web platform that combines thrift purchasing, barter-based swapping and an AI-driven virtual try-on system. Users can list and buy second-hand fashion and view real-time fit on a personalized avatar based on their measurements.

### **Brief Project Description:**  
The platform allows users to create a custom avatar based on body measurements and virtually try on clothes before purchasing. It encourages sustainability, reduces waste and enhances user confidence when shopping for pre-owned clothing items.


## 3. Technical Details

### **Tech Stack Used**

#### **Frontend**
- React.js  
- JavaScript  
- Tailwind CSS    

#### **Backend**
- Python    
- Firebase 
- Supabase

#### **AI & 3D Technologies**
- ngrok  
- Uvicorn
- FastAPI
  

### **Libraries, APIs & Models Used** 
- **Firebase Authentication** for secure user login
- **OOTDiffusion, model_id=levishu/OOTDiffusion** for temporary virtual try-on


### **Implementation Overview**

#### **Key Modules:**
- User Authentication  
- Clothing Upload & Listing System 
- Virtual Try-On Renderer   

#### **Workflow Summary**
1. User enters or uploads body measurements
2. User uploads or selects clothing  
3. Virtual try-on is generated
4. AI maps clothing mesh onto avatar  


## 4. Installation & Execution
## How to Run the Project

1. Clone the repository  
`git clone [https://github.com/pavithradeepue/Thrift-and-Go.git](https://github.com/pavithradeepue/Thrift-and-Go.git)`

2. Move into the project folder  
`cd your-repository-name`

3. Install frontend dependencies  
`cd frontend`  
`npm install`  
`npm start`

4. Open a new terminal and run the backend  
`cd backend`  
`python -m venv venv`  
`venv\Scripts\activate`  
`pip install -r requirements.txt`  
`uvicorn main:app --reload`

5.5. Set up AI Size Analysis (Google Colab)  
-Open the following notebook and run all cells:  
-https://colab.research.google.com/drive/1LC5ZjCZhQNdqBHrmy2lvWAgk29nM-5uc?usp=sharing  

7. Open in browser  
`http://localhost:3000`

Demo Video Link:
https://drive.google.com/drive/u/0/folders/1TZy2GqyAu0UG5o8GqW965iM88pJZ4MVi
