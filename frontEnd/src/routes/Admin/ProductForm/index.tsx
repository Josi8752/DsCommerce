import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/form';
import * as productService from '../../../services/product-service';
import * as categoriesService from '../../../services/category-service';
import FormTextArea from '../../../components/FormTextArea';
import { CategoriesDTO } from '../../../models/categories';
import FormSelect from '../../../components/FormSelect';
import { selectStyles } from '../../../utils/select';

export default function ProductForm() {

    const params = useParams();
    const isEditing = params.productId !== 'create';
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoriesDTO[]>([]);
    const [formData, setFormData] = useState<any>({

        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
            validation: function (value: string) {
                return /^.{3,80}$/.test(value);
            },
            message: "Favor informar um nome de 3 a 80 caracteres"
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
            validation: function (value: number) {
                return Number(value) > 0;
            },
            message: "Informe um preço positivo",
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "  imgUrl",
            type: "text",
            placeholder: "Imagem",
        },
        description: {
            value: "",
            id: "description",
            name: "description",
            type: "text",
            placeholder: "Descrição",
            validation: function (value: string) {
                return /^.{10,}$/.test(value);
            },
            message: " A descrição deve ter pelo menos 10 caracteres"
        },
        categories: {
            value: [],
            name: "categories",
            placeholder: "Categorias",
            validation: function (value: CategoriesDTO[]) {
                return value.length > 0
            },
            message: " A descrição deve ter pelo menos 1 elemento"

        }
    });

    useEffect(() => {


        if (isEditing) {
            productService.findById(Number(params.productId))
                .then(response => {
                    const newFormData = forms.updateAll(formData, response.data);
                    setFormData(newFormData);
                })
        }
    }, [])

    useEffect(() => {
        categoriesService.findAllRequest()
            .then(response => {
                setCategories(response.data);
            })
    }, [])


    function handleCancelProduct() {
        navigate("/admin/products")
    }

    function handleInputChange(event: any) {

        const result = forms.updateAndValidate(formData, event.target.name, event.target.value)
        setFormData(result);

    }

    function handleTurnDirty(name: string) {
        const newFormData = forms.dirtyAndValidate(formData, name);
        setFormData(newFormData);
    }

    function handleSubmit(event: any) {
        event.preventDefault();

        const formDataValidated = forms.dirtyAndValidateAll(formData);
        if (forms.hasAnyInvalid(formDataValidated)) {
            setFormData(formDataValidated);
            return;
        }
        const requestBody = forms.toValues(formData);
        if (isEditing) {
            requestBody.id = params.productId;
        }
        productService.updateRequest(requestBody)
            .then(() => {
                navigate("/admin/products")
            })
    }
    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form" onSubmit={handleSubmit}>
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput className="dsc-form-control"
                                    {...formData.name}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.name.message}</div>
                            </div>

                            <div>
                                <FormInput className="dsc-form-control"
                                    {...formData.price}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.price.message}</div>
                            </div>

                            <div>
                                <FormInput className="dsc-form-control"
                                    {...formData.imgUrl}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormSelect className="dsc-form-control dsc-form-select-container"
                                    styles={selectStyles}
                                    {...formData.categories}
                                    options={categories}
                                    onChange={(obj: any) => {
                                        const newFormData = forms.updateAndValidate(formData, "categories", obj);
                                        setFormData(newFormData);
                                    }}
                                    onTurnDirty={handleTurnDirty}
                                    isMulti
                                    getOptionLabel={(obj: any) => obj.name}
                                    getOptionValue={(obj: any) => String(obj.id)}

                                />
                                <div className='dsc-form-error'>{formData.categories.message}</div>
                            </div>
                            <div>
                                <FormTextArea className="dsc-form-control dsc-textarea"
                                    {...formData.description}
                                    onTurnDirty={handleTurnDirty}
                                    onChange={handleInputChange}
                                />
                                <div className='dsc-form-error'>{formData.description.message}</div>
                            </div>
                        </div>

                        <div className="dsc-product-form-buttons">
                            <div onClick={handleCancelProduct}>
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </div>

                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}