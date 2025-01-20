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

export function KidneyPage() {
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
    Bp: "", // Blood Pressure
    Sg: "", // Specific Gravity
    Al: "", // Albumin
    Su: "", // Sugar
    Rbc: "", // Red Blood Cells
    Bu: "", // Blood Urea
    Sc: "", // Serum Creatinine
    Sod: "", // Sodium
    Pot: "", // Potassium
    Hemo: "", // Hemoglobin
    Wbcc: "", // White Blood Cell Count
    Rbcc: "", // Red Blood Cell Count
    Htn: 0, // Hypertension (1=Yes, 0=No)
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Blood Pressure: Must be a positive number
    if (!formData.Bp) newErrors.Bp = "Blood Pressure is required";
    else if (isNaN(formData.Bp) || Number(formData.Bp) <= 0)
      newErrors.Bp = "Blood Pressure must be a valid positive number";

    // Specific Gravity: Should be a positive number
    if (!formData.Sg) newErrors.Sg = "Specific Gravity is required";
    else if (isNaN(formData.Sg) || Number(formData.Sg) <= 0)
      newErrors.Sg = "Specific Gravity must be a valid positive number";

    // Albumin: Should be a positive number
    if (!formData.Al) newErrors.Al = "Albumin is required";
    else if (isNaN(formData.Al) || Number(formData.Al) <= 0)
      newErrors.Al = "Albumin must be a valid positive number";

    // Sugar: Should be a positive number
    if (!formData.Su) newErrors.Su = "Sugar level is required";
    else if (isNaN(formData.Su) || Number(formData.Su) < 0)
      newErrors.Su = "Sugar level must be a valid non-negative number";

    // Red Blood Cells: Should be a positive number
    if (!formData.Rbc) newErrors.Rbc = "Red Blood Cells value is required";
    else if (isNaN(formData.Rbc) || Number(formData.Rbc) < 0)
      newErrors.Rbc =
        "Red Blood Cells value must be a valid non-negative number";

    // Blood Urea: Should be a positive number
    if (!formData.Bu) newErrors.Bu = "Blood Urea level is required";
    else if (isNaN(formData.Bu) || Number(formData.Bu) < 0)
      newErrors.Bu = "Blood Urea level must be a valid non-negative number";

    // Serum Creatinine: Should be a positive number
    if (!formData.Sc) newErrors.Sc = "Serum Creatinine is required";
    else if (isNaN(formData.Sc) || Number(formData.Sc) < 0)
      newErrors.Sc = "Serum Creatinine must be a valid non-negative number";

    // Sodium: Should be a positive number
    if (!formData.Sod) newErrors.Sod = "Sodium level is required";
    else if (isNaN(formData.Sod) || Number(formData.Sod) < 0)
      newErrors.Sod = "Sodium level must be a valid non-negative number";

    // Potassium: Should be a positive number
    if (!formData.Pot) newErrors.Pot = "Potassium level is required";
    else if (isNaN(formData.Pot) || Number(formData.Pot) < 0)
      newErrors.Pot = "Potassium level must be a valid non-negative number";

    // Hemoglobin: Should be a positive number
    if (!formData.Hemo) newErrors.Hemo = "Hemoglobin level is required";
    else if (isNaN(formData.Hemo) || Number(formData.Hemo) <= 0)
      newErrors.Hemo = "Hemoglobin must be a valid positive number";

    // White Blood Cell Count: Should be a positive number
    if (!formData.Wbcc) newErrors.Wbcc = "White Blood Cell Count is required";
    else if (isNaN(formData.Wbcc) || Number(formData.Wbcc) < 0)
      newErrors.Wbcc =
        "White Blood Cell Count must be a valid non-negative number";

    // Red Blood Cell Count: Should be a positive number
    if (!formData.Rbcc) newErrors.Rbcc = "Red Blood Cell Count is required";
    else if (isNaN(formData.Rbcc) || Number(formData.Rbcc) < 0)
      newErrors.Rbcc =
        "Red Blood Cell Count must be a valid non-negative number";

    // Hypertension: Must be 0 or 1
    if (!formData.Htn) newErrors.Htn = "Hypertension status is required";
    else if (![0, 1].includes(Number(formData.Htn)))
      newErrors.Htn = "Hypertension status must be either 0 (No) or 1 (Yes)";

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
          `${
            import.meta.env.VITE_ONRENDER_MODEL_API
          }/chronic_kidney_disease/predict`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Bp: parseFloat(formData.Bp), // Blood Pressure
              Sg: parseFloat(formData.Sg), // Specific Gravity
              Al: parseFloat(formData.Al), // Albumin
              Su: parseFloat(formData.Su), // Sugar
              Rbc: parseFloat(formData.Rbc), // Red Blood Cells
              Bu: parseFloat(formData.Bu), // Blood Urea
              Sc: parseFloat(formData.Sc), // Serum Creatinine
              Sod: parseFloat(formData.Sod), // Sodium
              Pot: parseFloat(formData.Pot), // Potassium
              Hemo: parseFloat(formData.Hemo), // Hemoglobin
              Wbcc: parseFloat(formData.Wbcc), // White Blood Cell Count
              Rbcc: parseFloat(formData.Rbcc), // Red Blood Cell Count
              Htn: parseInt(formData.Htn, 10), // Hypertension (1=Yes, 0=No)
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
            "Your chronic kidney disease assessment results are displayed below.",
          results: [{ Disease_Name: "CKD", Prediction: data.Prediction }],
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
          <CardTitle>Chronic Kidney Disease Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {[
              {
                field: "Bp",
                placeholder: "Blood pressure (mm Hg)",
                description: "Diastolic blood pressure",
              },
              {
                field: "Sg",
                placeholder: "Specific gravity",
                description: "Specific gravity of urine",
              },
              {
                field: "Al",
                placeholder: "Albumin",
                description: "Amount of albumin in urine",
              },
              {
                field: "Su",
                placeholder: "Sugar level",
                description: "Urine sugar level",
              },
              {
                field: "Rbc",
                placeholder: "Red blood cells",
                description: "Number of red blood cells in urine",
              },
              {
                field: "Bu",
                placeholder: "Blood urea",
                description: "Amount of urea in blood",
              },
              {
                field: "Sc",
                placeholder: "Serum creatinine",
                description: "Creatinine level in blood",
              },
              {
                field: "Sod",
                placeholder: "Sodium level",
                description: "Sodium level in urine",
              },
              {
                field: "Pot",
                placeholder: "Potassium level",
                description: "Potassium level in urine",
              },
              {
                field: "Hemo",
                placeholder: "Hemoglobin",
                description: "Amount of hemoglobin in blood",
              },
              {
                field: "Wbcc",
                placeholder: "White blood cell count",
                description: "Count of white blood cells in urine",
              },
              {
                field: "Rbcc",
                placeholder: "Red blood cell count",
                description: "Count of red blood cells in blood",
              },
              {
                field: "Htn",
                description: "If the person has hypertension",
                isSelect: true,
              },
            ].map(({ field, placeholder, description, isSelect }) => (
              <div key={field} className="mb-4">
                <Label htmlFor={field} className="text-base capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </Label>

                {isSelect ? (
                  <Select
                    id={field}
                    name={field}
                    value={parseInt(formData[field], 10)}
                    onValueChange={(value) => handleSelectChange("Htn", value)}
                    className="mt-2"
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Do you have hypertension" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={0}>No</SelectItem>
                      <SelectItem value={1}>Yes</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="number"
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
                await handleSaveReport("kidney", drawerContent.results);
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
