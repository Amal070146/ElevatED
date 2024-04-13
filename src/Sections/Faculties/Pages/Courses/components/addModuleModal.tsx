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
  id: string;
  modules: any[];
};

const schema = z.object({
  name: z.string().min(1, { message: "Course name is required" }),
  yt_link: z.string().optional(),
  description: z.string().optional(),
});
type FormFields = z.infer<typeof schema>;

const AddModuleModal = (props: Props) => {
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
      await addModule(data).then(() => {
        props.onClose();
        props.refresh();
        toast.success("Module added successfully");
      });
    } catch (error) {
      setError("root", {
        message: String(error),
      });
    }
  };

  const addModule = async (formData: FormFields) => {
    const updatedModules = [...props.modules, formData];
    const { data, error } = await supabase
      .from("courses")
      .update({ modules: updatedModules })
      .eq("id", props.id)
      .select();
    if (error) {
      throw error.message;
    } else if (data) {
      return data;
    }
  }

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
        <div>
          <label htmlFor="">Course name</label>
          <input
            type="text"
            placeholder="Data Structures and Algorithms"
            {...register("name")}
          />
        </div>
        {errors.name && <p className="error">{errors.name.message}</p>}
        <div>
          <label htmlFor="">Youtube link</label>
          <input
            type="text"
            placeholder="https://youtube.com/1234"
            {...register("yt_link")}
          />
        </div>
        {errors.yt_link && <p className="error">{errors.yt_link.message}</p>}
        <div>
          <label htmlFor="">Description</label>
          <textarea
            placeholder="Description"
            {...register("description")}
          ></textarea>
        </div>
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className={styles.loginBtn}
        >
          {isSubmitting ? "Loading..." : "Continue"}
        </button>
        {errors.root && <div className="error">{errors.root.message}</div>}
      </form>
    </Modal>
  );
};

export default AddModuleModal;
