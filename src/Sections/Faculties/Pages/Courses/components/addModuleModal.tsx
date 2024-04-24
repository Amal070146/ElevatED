import { z } from "zod";
import Modal from "../../../../../Components/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../index.module.css";
import toast from "react-hot-toast";
import { supabase } from "../../../../../utils/supabase";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  refresh: () => void;
  id: string;
  modules: any[];
  isEdit: boolean;
  moduleID?: number;
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {},
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (props.isEdit && props.moduleID) {
      const moduleToEdit = props.modules.find(
        (module) => module.id === props.moduleID
      );
      if (moduleToEdit) {
        reset(moduleToEdit);
      }
    }
  }, [props.isEdit, props.moduleID, props.modules, reset]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (props.isEdit && props.moduleID) {
        // Perform update operation if in edit mode
        await updateModule(props.moduleID, data);
        props.onClose();
        props.refresh();
        toast.success("Module updated successfully");
      } else {
        // Perform add operation if not in edit mode
        await addModule(data);
        props.onClose();
        props.refresh();
        toast.success("Module added successfully");
      }
    } catch (error) {
      setError("root", {
        message: String(error),
      });
    }
  };

  const addModule = async (formData: FormFields) => {
    const count = props.modules.length;
    const newFormData = { ...formData, id: count + 1 };
    const updatedModules = [...props.modules, newFormData];
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
  };

  const updateModule = async (moduleID: number, formData: FormFields) => {
    const updatedModules = props.modules.map((module) =>
      module.id === moduleID ? formData : module
    );
    console.log(props.id);
    console.log(updatedModules);
    const { data, error } = await supabase
      .from("courses")
      .update({ modules: updatedModules })
      .eq("id", props.id)
      .select();

    if (error) {
      throw error.message;
    } else {
      return data;
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => props.onClose()}
      title={props.isEdit ? "Edit Module" : "Add a Module"}
      type={"success"}
    >
      <form
        className={styles.RightContaainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.BoxOptions}>
          <label htmlFor="">Module name</label>
          <input
            type="text"
            placeholder="Data Structures and Algorithms"
            {...register("name")}
          />
        </div>
        {errors.name && <p className="error">{errors.name.message}</p>}
        <div className={styles.BoxOptions}>
          <label htmlFor="">Youtube link</label>
          <input
            type="text"
            placeholder="https://youtube.com/1234"
            {...register("yt_link")}
          />
        </div>
        {errors.yt_link && <p className="error">{errors.yt_link.message}</p>}
        <div className={styles.BoxOptions}>
          <label htmlFor="">Description</label>
          <textarea
            placeholder="Description"
            {...register("description")}
          ></textarea>
        </div>
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
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

export default AddModuleModal;