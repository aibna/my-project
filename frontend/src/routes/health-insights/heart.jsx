import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GiSpinningBlades } from "react-icons/gi";
import { saveReport } from "@/utils/reports";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HeartPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({
    title: "",
    description: "",
    results: [
      {
        Disease_Name: "Disease 1",
        Prediction: true,
      },
    ],
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    sex: "0",
    cp: "1",
    trestbps: "",
    chol: "",
    fbs: "0",
    restecg: "0",
    thalach: "",
    exang: "0",
    oldpeak: "",
    slope: "2",
    ca: "0",
    thal: "3",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Age: Must be a positive integer, typically 18-120 years old
    if (!formData.age) newErrors.age = "Age is required";
    else if (
      isNaN(formData.age) ||
      Number(formData.age) <= 0 ||
      !Number.isInteger(Number(formData.age))
    )
      newErrors.age = "Age must be a valid positive integer";

    // Sex: Must be either 1 (Male) or 0 (Female)
    if (!formData.sex) newErrors.sex = "Sex is required";
    else if (![0, 1].includes(Number(formData.sex)))
      newErrors.sex = "Sex must be either 0 (Female) or 1 (Male)";

    // CP (Chest Pain Type): Must be an integer value (likely 0-3)
    if (!formData.cp) newErrors.cp = "Chest pain type is required";
    else if (![0, 1, 2, 3].includes(Number(formData.cp)))
      newErrors.cp = "Chest pain type must be a valid integer (0-3)";

    // Resting Blood Pressure (trestbps): Must be a positive integer
    if (!formData.trestbps)
      newErrors.trestbps = "Resting blood pressure is required";
    else if (isNaN(formData.trestbps) || Number(formData.trestbps) <= 0)
      newErrors.trestbps =
        "Resting blood pressure must be a valid positive number";

    // Serum Cholesterol (chol): Must be a positive integer
    if (!formData.chol) newErrors.chol = "Cholesterol level is required";
    else if (isNaN(formData.chol) || Number(formData.chol) <= 0)
      newErrors.chol = "Cholesterol level must be a valid positive number";

    // Fasting Blood Sugar (fbs): Must be either 1 (True) or 0 (False)
    if (!formData.fbs) newErrors.fbs = "Fasting blood sugar is required";
    else if (![0, 1].includes(Number(formData.fbs)))
      newErrors.fbs =
        "Fasting blood sugar must be either 0 (False) or 1 (True)";

    // Resting Electrocardiographic Results (restecg): Must be an integer value (likely 0-2)
    if (!formData.restecg) newErrors.restecg = "Resting ECG result is required";
    else if (![0, 1, 2].includes(Number(formData.restecg)))
      newErrors.restecg = "Resting ECG result must be a valid integer (0-2)";

    // Maximum Heart Rate Achieved (thalach): Must be a positive integer
    if (!formData.thalach) newErrors.thalach = "Maximum heart rate is required";
    else if (isNaN(formData.thalach) || Number(formData.thalach) <= 0)
      newErrors.thalach = "Maximum heart rate must be a valid positive number";

    // Exercise Induced Angina (exang): Must be either 1 (Yes) or 0 (No)
    if (!formData.exang)
      newErrors.exang = "Exercise induced angina is required";
    else if (![0, 1].includes(Number(formData.exang)))
      newErrors.exang =
        "Exercise induced angina must be either 0 (No) or 1 (Yes)";

    // ST Depression Induced by Exercise (oldpeak): Must be a valid float number
    if (!formData.oldpeak) newErrors.oldpeak = "ST depression is required";
    else if (isNaN(formData.oldpeak))
      newErrors.oldpeak = "ST depression must be a valid number";

    // Slope of the Peak Exercise ST Segment (slope): Must be an integer (likely 0-2)
    if (!formData.slope) newErrors.slope = "Slope is required";
    else if (![0, 1, 2].includes(Number(formData.slope)))
      newErrors.slope = "Slope must be a valid integer (0-2)";

    // Number of Major Vessels Colored by Fluoroscopy (ca): Must be an integer (0-3)
    if (!formData.ca) newErrors.ca = "Number of vessels is required";
    else if (![0, 1, 2, 3].includes(Number(formData.ca)))
      newErrors.ca = "Number of vessels must be a valid integer (0-3)";

    // Thalassemia (thal): Must be either 3 (Normal), 6 (Fixed Defect), or 7 (Reversible Defect)
    if (!formData.thal) newErrors.thal = "Thalassemia is required";
    else if (![3, 6, 7].includes(Number(formData.thal)))
      newErrors.thal =
        "Thalassemia must be either 3 (Normal), 6 (Fixed Defect), or 7 (Reversible Defect)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    console.log(formData);

    if (validateForm()) {
      console.log(formData);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_ONRENDER_MODEL_API}/heart_disease/predict`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              age: parseInt(formData.age, 10),
              sex: parseInt(formData.sex, 10),
              cp: parseInt(formData.age, 10),
              trestbps: parseInt(formData.cp, 10),
              chol: parseInt(formData.chol, 10),
              fbs: parseInt(formData.fbs, 10),
              restecg: parseInt(formData.restecg, 10),
              thalach: parseInt(formData.thalach, 10),
              exang: parseInt(formData.exang, 10),
              oldpeak: parseInt(formData.oldpeak, 10),
              slope: parseInt(formData.slope, 10),
              ca: parseInt(formData.ca, 10),
              thal: parseInt(formData.thal, 10),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data);

        setDrawerContent({
          title: "Assessment Complete",
          description:
            "Your heart disease assessment results are displayed below.",
          results: [
            { Disease_Name: "Heart Disease", Prediction: data.Prediction },
          ],
        });

        setIsOpen(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Form has errors");
    }

    setIsProcessing(false);
  };

  const handleSaveReport = async (type, content) => {
    await saveReport(type, formData, content);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>Diabetes Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {[
              {
                field: "age",
                placeholder: "Age in years",
                description: "Age of the person in years",
                type: "number", // Keep number type for age
              },
              {
                field: "sex",
                placeholder: "Your Gender",
                description: "Sex of the patient (1 = Male, 0 = Female)",
                type: "select", // Use select for categorical input
                options: [
                  { label: "Male", value: 1 },
                  { label: "Female", value: 0 },
                ],
              },
              {
                field: "cp",
                placeholder: "Chest Pain Type (1-4)",
                description:
                  "Chest pain type (1 = typical angina, 2 = atypical angina, 3 = non-anginal pain, 4 = asymptomatic)",
                type: "select", // Use select for categorical input
                options: [
                  { label: "Typical Angina", value: 1 },
                  { label: "Atypical Angina", value: 2 },
                  { label: "Non-Anginal Pain", value: 3 },
                  { label: "Asymptomatic", value: 4 },
                ],
              },
              {
                field: "fbs",
                placeholder: "Fasting Blood Sugar More Than 120 mg/dl",
                description: "Fasting blood sugar > 120 mg/dl",
                type: "select", // Use select for categorical input
                options: [
                  { label: "True", value: 1 },
                  { label: "False", value: 0 },
                ],
              },
              {
                field: "restecg",
                placeholder: "Resting Electrocardiographic Results",
                description:
                  "Resting electrocardiographic results (normal, having ST-T wave abnormality, showing probable or definite left ventricular hypertrophy)",
                type: "select", // Use select for categorical input
                options: [
                  { label: "Normal", value: 0 },
                  { label: "ST-T Wave Abnormality", value: 1 },
                  { label: "Left Ventricular Hypertrophy", value: 2 },
                ],
              },
              {
                field: "thal",
                placeholder:
                  "Thalassemia (3 = Normal, 6 = Fixed Defect, 7 = Reversible Defect)",
                description:
                  "Thalassemia (3 = normal, 6 = fixed defect, 7 = reversible defect)",
                type: "select", // Use select for categorical input
                options: [
                  { label: "Normal", value: 3 },
                  { label: "Fixed Defect", value: 6 },
                  { label: "Reversible Defect", value: 7 },
                ],
              },
              // Include other fields like age, trestbps, etc. as numeric fields
              {
                field: "trestbps",
                placeholder: "Resting Blood Pressure (mm Hg)",
                description: "Resting blood pressure (mm Hg)",
                type: "number", // Keep number type for numeric fields
              },
              {
                field: "chol",
                placeholder: "Serum Cholesterol (mg/dl)",
                description: "Serum cholesterol level (mg/dL)",
                type: "number", // Keep number type for numeric fields
              },
              {
                field: "thalach",
                placeholder: "Maximum Heart Rate Achieved",
                description: "Maximum heart rate achieved",
                type: "number", // Keep number type for numeric fields
              },
              {
                field: "exang",
                placeholder: "Exercise Induced Angina",
                description: "Exercise induced angina",
                type: "select", // Use select for categorical input
                options: [
                  { label: "Yes", value: 1 },
                  { label: "No", value: 0 },
                ],
              },
              {
                field: "oldpeak",
                placeholder:
                  "ST Depression Induced by Exercise Relative to Rest",
                description:
                  "ST depression induced by exercise relative to rest",
                type: "number", // Keep number type for numeric fields
              },
              {
                field: "slope",
                placeholder: "Slope of the Peak Exercise ST Segment",
                description:
                  "Slope of the peak exercise ST segment (upsloping, flat, downsloping)",
                type: "select", // Use select for categorical input
                options: [
                  { label: "Upsloping", value: 0 },
                  { label: "Flat", value: 1 },
                  { label: "Downsloping", value: 2 },
                ],
              },
              {
                field: "ca",
                placeholder: "Number of Major Vessels Colored by Fluoroscopy",
                description:
                  "Number of major vessels colored by fluoroscopy (0-3)",
                type: "select", // Use select for categorical input
                options: [
                  { label: "0", value: 0 },
                  { label: "1", value: 1 },
                  { label: "2", value: 2 },
                  { label: "3", value: 3 },
                ],
              },
            ].map(({ field, placeholder, description, type, options }) => (
              <div key={field} className="mb-4">
                <Label htmlFor={field} className="text-base capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                {type === "select" ? (
                  <Select
                    onValueChange={(value) => handleSelectChange(field, value)}
                    value={parseInt(formData[field], 10)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map(({ label, value }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={type}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-2"
                    placeholder={placeholder}
                  />
                )}
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
                <small className="text-gray-500 mt-1">{description}</small>
              </div>
            ))}
          </form>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <GiSpinningBlades className="animate-spin"></GiSpinningBlades>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className="max-w-2xl mx-auto">
            <DrawerTitle className="text-center">
              {drawerContent.title}
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {drawerContent.description}
            </DrawerDescription>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Disease Name</TableHead>
                  <TableHead className="text-left">Prediction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drawerContent.results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-left">
                      {result.Disease_Name}
                    </TableCell>
                    <TableCell className="font-medium text-left">
                      {result.Prediction ? "True" : "False"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              className="w-full mt-4"
              disabled={isSaving}
              onClick={async () => {
                setIsSaving(true);
                await handleSaveReport("heart", drawerContent.results);
                setIsSaving(false);
                setIsOpen(false);
              }}
            >
              {isSaving ? (
                <GiSpinningBlades className="animate-spin"></GiSpinningBlades>
              ) : (
                "Save Report"
              )}
            </Button>
          </DrawerHeader>
          <DrawerFooter className="max-w-xl mx-auto w-full">
            <DrawerClose>
              <Button
                variant="destructive"
                className="w-full"
                disabled={isSaving}
              >
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
