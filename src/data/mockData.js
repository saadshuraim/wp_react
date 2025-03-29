// data/books.js

export const books = [
  {
    id: 1,
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    description:
      "The leading textbook in Artificial Intelligence, used in over 1400 universities in over 120 countries. The full-color third edition updated in 2021 features significant updates in the areas of adversarial search, constraint satisfaction, reinforcement learning, multiagent systems, NLP, and deep learning. The book discusses the real-world applications and explores both the theoretical foundations and practical applications of AI in modern technology.",
    coverImage: "/images/Artificial Intelligence A Modern Approach.jpg",
    rating: 4.5,
    reviews: [
      {
        id: 101,
        username: "Ahmed Zafar",
        userImg: "AZ",
        userColor: "bg-secondary",
        affiliation: "FAST University, CS Dept",
        rating: 5,
        comment:
          "This is an excellent textbook that covers all the fundamentals of AI. The examples are relevant and the explanations are clear. I especially enjoyed the sections on machine learning and neural networks which directly apply to my coursework at FAST University. Highly recommended for AI students!",
        date: "May 15, 2023",
      },
      {
        id: 102,
        username: "Sara Rizvi",
        userImg: "SR",
        userColor: "bg-primary",
        affiliation: "AI Department Faculty",
        rating: 4,
        comment:
          "I use this book for my Introduction to AI course at FAST University Karachi. The content is comprehensive and well-structured, though some students find certain chapters challenging. The examples are helpful, but I wish there were more Pakistan-specific case studies. Overall, it's an essential resource for any AI program.",
        date: "April 3, 2023",
      },
      {
        id: 103,
        username: "Usman Khan",
        userImg: "UK",
        userColor: "bg-accent",
        affiliation: "3rd Year AI Student",
        rating: 3.5,
        comment:
          "As a student at FAST University's AI program, I found this book extremely helpful for understanding core AI concepts. The chapters on neural networks and machine learning algorithms helped me with my final year project. I do think some sections are a bit too theoretical and could use more practical examples.",
        date: "March 12, 2023",
      },
    ],
    categories: ["Artificial Intelligence", "Computer Science", "Textbook"],
    published: "2021",
    pages: 1102,
  },
  {
    id: 2,
    title: "Deep Learning",
    author: "Ian Goodfellow, Yoshua Bengio & Aaron Courville",
    description:
      "An introduction to a broad range of topics in deep learning, covering mathematical and conceptual background, deep learning techniques, and research perspectives. Written by three experts in the field, Deep Learning is the only comprehensive book on the subject. It provides much-needed broad perspective and mathematical preliminaries for beginners, while offering sufficient detail for practitioners and researchers.",
    coverImage: "/images/Deep Learning.jpg",
    rating: 4.0,
    reviews: [
      {
        id: 201,
        username: "Fatima Ahmed",
        userImg: "FA",
        userColor: "bg-primary",
        affiliation: "FAST University, AI Dept",
        rating: 4,
        comment:
          "This book provided me with a solid foundation in deep learning concepts. The mathematical explanations are rigorous but accessible, and the diagrams help visualize complex architectures. Essential reading for any AI student at FAST University.",
        date: "June 10, 2023",
      },
      {
        id: 202,
        username: "Bilal Nasir",
        userImg: "BN",
        userColor: "bg-secondary",
        affiliation: "Research Assistant",
        rating: 4,
        comment:
          "I'm using this as a reference for my research work in the AI Lab at FAST University. It covers all the fundamental concepts with clear explanations and enough mathematical detail. Highly recommend for anyone serious about deep learning.",
        date: "May 5, 2023",
      },
    ],
    categories: ["Artificial Intelligence", "Deep Learning", "Machine Learning"],
    published: "2016",
    pages: 800,
  },
  {
    id: 3,
    title: "The Reluctant Fundamentalist",
    author: "Mohsin Hamid",
    description:
      "A monologue by a Pakistani man to an American stranger about his love affair with America and subsequent disillusionment. The novel explores themes of Pakistani identity, Western perception of Pakistan, and the human impact of the geopolitical conflicts that arose after 9/11. The story follows Changez, a Princeton graduate who achieves corporate success in New York before returning to Lahore following a personal and professional crisis.",
    coverImage: "/images/The Reluctant Fundamentalist.jpg",
    rating: 5.0,
    reviews: [
      {
        id: 301,
        username: "Amara Khan",
        userImg: "AK",
        userColor: "bg-accent",
        affiliation: "Literature Club President",
        rating: 5,
        comment:
          "As a Pakistani student, this novel resonated deeply with me. Hamid's narrative style is engaging, and the perspectives on identity and belonging are thought-provoking. We used this for our book club at FAST University, and it sparked insightful discussions about cultural identity.",
        date: "April 22, 2023",
      },
      {
        id: 302,
        username: "Dr. Imran Malik",
        userImg: "IM",
        userColor: "bg-primary",
        affiliation: "Cultural Studies Professor",
        rating: 5,
        comment:
          "I recommend this book to all my students at FAST University. It presents complex themes of post-colonial identity, globalization, and personal ethics in an accessible narrative. The ambiguous ending encourages critical thinking and debate - perfect for classroom discussions.",
        date: "March 15, 2023",
      },
    ],
    categories: ["Pakistani Literature", "Fiction"],
    published: "2007",
    pages: 184,
  },
  {
    id: 4,
    title: "Machine Learning for Dummies",
    author: "John Paul Mueller & Luca Massaron",
    description:
      "A beginner-friendly introduction to machine learning with practical examples. This accessible guide helps demystify machine learning by explaining the fundamentals in plain English and demonstrating real-world applications. Perfect for beginners looking to understand how machine learning technology works and how it's transforming our world.",
    coverImage: "/images/Machine Learning for Dummies.jpg",
    rating: 3.0,
    reviews: [
      {
        id: 401,
        username: "Zain Abbas",
        userImg: "ZA",
        userColor: "bg-secondary",
        affiliation: "1st Year AI Student",
        rating: 3,
        comment:
          "As a new student in the AI program at FAST University, this book helped me grasp the basics of machine learning without getting overwhelmed. The examples are simple, but I wish there were more practical exercises related to what we're studying.",
        date: "July 5, 2023",
      },
    ],
    categories: ["Artificial Intelligence", "Machine Learning", "Beginners"],
    published: "2019",
    pages: 432,
  },
  {
    id: 5,
    title: "A Case of Exploding Mangoes",
    author: "Mohammed Hanif",
    description:
      "A satirical novel about the mysterious plane crash that killed Pakistan's President Zia ul-Haq in 1988. This darkly comic novel weaves together multiple storylines to create a complex narrative about power, conspiracy, and life in Pakistan during the 1980s. The story follows a young Air Force officer who plots revenge against the dictator while exploring various theories about the real-life unsolved case of the president's death.",
    coverImage: "/images/A Case of Exploding Mangoes.jpg",
    rating: 4.0,
    reviews: [
      {
        id: 501,
        username: "Hassan Ali",
        userImg: "HA",
        userColor: "bg-primary",
        affiliation: "History Student",
        rating: 4,
        comment:
          "A brilliant blend of fact and fiction that offers insight into an important period of Pakistani history. The satirical approach makes complex political events accessible. This book sparked interesting discussions in our Pakistani literature course at FAST University.",
        date: "February 12, 2023",
      },
    ],
    categories: ["Pakistani Literature", "Fiction", "Historical Fiction"],
    published: "2008",
    pages: 336,
  },
  {
    id: 6,
    title: "Python Data Science Handbook",
    author: "Jake VanderPlas",
    description:
      "A comprehensive guide to scientific computing in Python, with detailed explanations of essential libraries for data science: NumPy, Pandas, Matplotlib, and Scikit-Learn. This practical guide is filled with clear examples and detailed explanations to help practitioners work effectively with Python's data science stack.",
    coverImage: "/images/Python Data Science Handbook.png",
    rating: 4.5,
    reviews: [
      {
        id: 601,
        username: "Aisha Siddiqui",
        userImg: "AS",
        userColor: "bg-accent",
        affiliation: "Data Science Lab Assistant",
        rating: 5,
        comment:
          "This book is indispensable in our AI labs at FAST University Karachi. The examples are practical and directly applicable to our research projects. The explanations of NumPy and Pandas are particularly useful for students working with large datasets.",
        date: "May 30, 2023",
      },
      {
        id: 602,
        username: "Faisal Rahman",
        userImg: "FR",
        userColor: "bg-secondary",
        affiliation: "4th Year AI Student",
        rating: 4,
        comment:
          "I've been using this handbook throughout my studies at FAST. The code examples are clear and the explanation of machine learning algorithms implemented in Python helped me immensely with my final year project on neural networks.",
        date: "April 11, 2023",
      },
    ],
    categories: ["Data Science", "Programming", "Python"],
    published: "2016",
    pages: 548,
  },
  {
    id: 7,
    title: "Moth Smoke",
    author: "Mohsin Hamid",
    description:
      "A tale of a young banker's fall from grace in contemporary Lahore. Set against the backdrop of nuclear tests in Pakistan and India, this debut novel explores themes of class conflict, addiction, and moral decay. The story follows Darashikoh Shezad, who loses his banking job and spirals into a world of drugs and crime while becoming involved with his best friend's wife.",
    coverImage: "/images/Moth Smoke.jpg",
    rating: 3.5,
    reviews: [
      {
        id: 701,
        username: "Mariam Tariq",
        userImg: "MT",
        userColor: "bg-primary",
        affiliation: "Literature Club Member",
        rating: 4,
        comment:
          "Hamid's portrayal of urban Pakistani society is raw and thought-provoking. The narrative explores social divides in Lahore with unflinching honesty. We discussed this book in our Pakistani literature seminar at FAST University, and it generated passionate debates about class inequality.",
        date: "January 15, 2023",
      },
      {
        id: 702,
        username: "Kamran Shah",
        userImg: "KS",
        userColor: "bg-secondary",
        affiliation: "Social Sciences Student",
        rating: 3,
        comment:
          "The book offers an interesting glimpse into Pakistan's urban elite and the socioeconomic divisions of the late 1990s. While the writing is compelling, I found some characters underdeveloped. Still, it's an important work of contemporary Pakistani literature.",
        date: "December 5, 2022",
      },
    ],
    categories: ["Pakistani Literature", "Fiction", "Contemporary"],
    published: "2000",
    pages: 256,
  },
  {
    id: 8,
    title: "Hands-On Machine Learning with Scikit-Learn & TensorFlow",
    author: "Aurélien Géron",
    description:
      "A practical guide to machine learning concepts, techniques, and implementations with real-world examples using popular Python libraries. This comprehensive handbook covers the full spectrum of machine learning tasks, from data preprocessing and model training to deployment and monitoring. The book balances theory with hands-on exercises to build proficiency in applying machine learning algorithms to real problems.",
    coverImage: "/images/Hands-On Machine Learning with Scikit-Learn & TensorFlow.jpg",
    rating: 5.0,
    reviews: [
      {
        id: 801,
        username: "Dr. Naveed Ahmed",
        userImg: "NA",
        userColor: "bg-primary",
        affiliation: "AI Department Head",
        rating: 5,
        comment:
          "This is the primary textbook we recommend for our advanced machine learning courses at FAST University. The explanations bridge theory and practice perfectly, and the exercises prepare students for real-world machine learning challenges. The TensorFlow section is particularly valuable for our deep learning research.",
        date: "June 20, 2023",
      },
      {
        id: 802,
        username: "Saad Mahmood",
        userImg: "SM",
        userColor: "bg-accent",
        affiliation: "Graduate Researcher",
        rating: 5,
        comment:
          "I've referenced this book countless times during my research at FAST University's AI lab. The code examples are clean, well-documented, and actually work! The explanation of neural network architectures has been immensely helpful for my thesis on computer vision applications.",
        date: "May 7, 2023",
      },
    ],
    categories: ["Artificial Intelligence", "Machine Learning", "Programming"],
    published: "2019",
    pages: 856,
  },
];

export const categories = [
  "All",
  "Artificial Intelligence",
  "Computer Science",
  "Pakistani Literature",
  "Fiction",
  "Machine Learning",
  "Data Science",
  "Programming",
];
