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

export function DiabetesPage() {
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
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    BMI: "",
    diabetesPedigreeFunction: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Pregnancies: Must be a non-negative integer, valid range is typically 0-20 or higher depending on individual cases
    if (!formData.pregnancies && formData.pregnancies !== 0)
      newErrors.pregnancies = "Number of pregnancies is required";
    else if (
      isNaN(formData.pregnancies) ||
      !Number.isInteger(Number(formData.pregnancies)) ||
      Number(formData.pregnancies) < 0
    )
      newErrors.pregnancies = "Must be a valid non-negative integer";

    // Glucose: Plasma glucose concentration should generally be non-negative and within a normal range (70–140 mg/dL postprandial)
    if (!formData.glucose) newErrors.glucose = "Glucose level is required";
    else if (isNaN(formData.glucose) || Number(formData.glucose) < 0)
      newErrors.glucose = "Glucose level must be a valid non-negative number";

    // Blood Pressure: Diastolic blood pressure should be a positive number. Normal range is usually between 60–90 mm Hg
    if (!formData.bloodPressure)
      newErrors.bloodPressure = "Blood pressure is required";
    else if (
      isNaN(formData.bloodPressure) ||
      Number(formData.bloodPressure) < 0
    )
      newErrors.bloodPressure =
        "Blood pressure must be a valid non-negative number";

    // Skin Thickness: Triceps skinfold thickness should be a positive integer. Usually, this value ranges from 10–40 mm
    if (!formData.skinThickness)
      newErrors.skinThickness = "Skin thickness is required";
    else if (
      isNaN(formData.skinThickness) ||
      Number(formData.skinThickness) < 0
    )
      newErrors.skinThickness =
        "Skin thickness must be a valid non-negative number";

    // Insulin: 2-Hour serum insulin levels should be a positive value. Typically ranges from 0 to 250 mu U/ml
    if (!formData.insulin) newErrors.insulin = "Insulin level is required";
    else if (isNaN(formData.insulin) || Number(formData.insulin) < 0)
      newErrors.insulin = "Insulin level must be a valid non-negative number";

    // BMI: BMI must be a positive floating-point number, typically ranges from 10 to 40
    if (!formData.BMI) newErrors.BMI = "BMI is required";
    else if (isNaN(formData.BMI) || Number(formData.BMI) <= 0)
      newErrors.BMI = "BMI must be a valid positive number greater than zero";

    // Diabetes Pedigree Function: Should be a non-negative floating-point number indicating genetic risk, usually ranges from 0 to 2.5
    if (!formData.diabetesPedigreeFunction)
      newErrors.diabetesPedigreeFunction =
        "Diabetes Pedigree Function is required";
    else if (
      isNaN(formData.diabetesPedigreeFunction) ||
      Number(formData.diabetesPedigreeFunction) < 0
    )
      newErrors.diabetesPedigreeFunction =
        "Diabetes Pedigree Function must be a valid non-negative number";

    // Age: Age must be a positive integer, typically 18-120 years old
    if (!formData.age) newErrors.age = "Age is required";
    else if (
      isNaN(formData.age) ||
      Number(formData.age) <= 0 ||
      !Number.isInteger(Number(formData.age))
    )
      newErrors.age = "Age must be a valid positive integer";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (validateForm()) {
      console.log(formData);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_ONRENDER_MODEL_API}/diabetes/predict`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Pregnancies: parseInt(formData.pregnancies, 10),
              Glucose: parseInt(formData.glucose, 10),
              BloodPressure: parseInt(formData.bloodPressure, 10),
              SkinThickness: parseInt(formData.skinThickness, 10),
              Insulin: parseInt(formData.insulin, 10),
              BMI: parseFloat(formData.BMI),
              DiabetesPedigreeFunction: parseInt(
                formData.diabetesPedigreeFunction,
                10
              ),
              Age: parseInt(formData.age, 10),
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
          description: "Your diabetes assessment results are displayed below.",
          results: [{ Disease_Name: "Diabetes", Prediction: data.Prediction }],
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
                field: "pregnancies",
                placeholder: "Number of times pregnant",
                description: "Number of pregnancies",
              },
              {
                field: "glucose",
                placeholder: "Plasma glucose concentration (mg/dL)",
                description: "Plasma glucose level after fasting",
              },
              {
                field: "bloodPressure",
                placeholder: "Diastolic blood pressure (mm Hg)",
                description: "Blood pressure (diastolic)",
              },
              {
                field: "skinThickness",
                placeholder: "Triceps skinfold thickness (mm)",
                description: "Skinfold thickness measurement",
              },
              {
                field: "insulin",
                placeholder: "2-Hour serum insulin (mu U/ml)",
                description: "Insulin level after 2 hours",
              },
              {
                field: "BMI",
                placeholder: "Body Mass Index (kg/m²)",
                description: "Calculated BMI value",
              },
              {
                field: "diabetesPedigreeFunction",
                placeholder: "Diabetes pedigree function",
                description: "Genetic risk of diabetes",
              },
              {
                field: "age",
                placeholder: "Age in years",
                description: "Age of the person in years",
              },
            ].map(({ field, placeholder, description }) => (
              <div key={field} className="mb-4">
                <Label htmlFor={field} className="text-base capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Input
                  type="number"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-2"
                  placeholder={placeholder}
                />
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
                await handleSaveReport("diabetes", drawerContent.results);
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
