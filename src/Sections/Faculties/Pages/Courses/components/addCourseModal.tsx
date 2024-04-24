import { z } from "zod";
import Modal from "../../../../../Components/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../index.module.css";
import toast from "react-hot-toast";
import { supabase } from "../../../../../utils/supabase";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
};


const schema = z.object({
  name: z.string().min(1, { message: "Course name is required" }),
});
type FormFields = z.infer<typeof schema>;

const AddCourseModal = (props: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await addCourse(data).then(() => {
        props.onClose();
        props.refresh();
        toast.success("Course added successfully");
      });
    } catch (error) {
      setError("root", {
        message: String(error),
      });
    }
  };

  const addCourse = async (formData: FormFields) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("courses")
        .insert([{ name: formData.name, user_id: user.id }])
        .select();
      if (error) {
        throw error.message;
      } else if (data) {
        return data;
      }
    } else {
      throw "User not found, please login again";
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      title={"Add a course"}
      type={"success"}
    >
      <form
        className={styles.RightContaainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.BoxOptions}>
          <label htmlFor="">Course name</label>
          <input
            type="text"
            placeholder="Data Structures and Algorithms"
            {...register("name")}
          />
        </div>
        {errors.name && <p className="error">{errors.name.message}</p>}
        <div className={styles.BoxButtons}>
          <button
            type="button"
            id={styles.cancelButton}
            className={styles.loginBtn}
            onClick={() => props.onClose()}
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className={styles.loginBtn}
          >
            {isSubmitting ? "Loading..." : "Continue"}
          </button>
        </div>
        {errors.root && <div className="error">{errors.root.message}</div>}
      </form>
    </Modal>
  );
};

export default AddCourseModal;
