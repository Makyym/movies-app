import { Field, Form, Formik } from "formik"
import s from "./SearchBar.module.css"
import toast from "react-hot-toast";

const style =  {
    backgroundColor: 'rgb(157, 3, 3)',
    width: '1000px',
    height: '100px',
    fontSize: '24px',
    color: 'white',
};

const SearchBar = ({onSubmit}) => {
    const handleSubmit = (values, options) => {
        const searchQuery = values.query.trim().toLowerCase();
        if (searchQuery === "") {
            toast.error("Nothing to search, please enter a query!", {style: style, icon: '',});
            return;
        }
        onSubmit(searchQuery)
        options.resetForm();
    }

    const initialValues = {
        query: "",
    }

    return (
        <div>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form className={s.form}>
                    <Field name="query" placeholder="Movie search" className={s.field} />
                    <button type="submit" className={s.button}>Search</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SearchBar