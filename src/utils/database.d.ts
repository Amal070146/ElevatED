interface CoursesDB {
  name: string;
  user_id: string;
  id: string;
  created_at: string;
  modules: any[]
}

interface CourseDisplayType {
  id: string;
  modules: ModuleItem[];
  created_at: string;
  user_id: string;
  name: string;
}

interface ModuleItem {
  id: number;
  mcq: Mcq[];
  pdf: {
    text: string;
    image_urls: string[];
  };
  name: string;
  longQA: LongQA[];
  yt_link: string;
  description: string;
}

interface Mcq {
  options: string[];
  question: string;
  correctAnswer: string;
}

interface LongQA {
  answer: string;
  question: string;
}


interface UserInfo {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  district: string;
  degree: string;
  department: string;
  institution_id: string;
  is_student: boolean;
  yog: string;
  allow_mail: boolean;
  working_institute_id: string | null;
}
