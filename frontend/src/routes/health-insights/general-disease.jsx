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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function GeneralDiseasePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState({});
  const [isNoDiseases, setIsNoDiseases] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    fever: "",
    cough: "",
    fatigue: "",
    difficultyBreathing: "",
    age: "",
    gender: "",
    bloodPressure: "",
    cholesterolLevel: "",
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

    if (!formData.fever) newErrors.fever = "Please select an option for Fever";
    if (!formData.cough) newErrors.cough = "Please select an option for Cough";
    if (!formData.fatigue)
      newErrors.fatigue = "Please select an option for Fatigue";
    if (!formData.difficultyBreathing)
      newErrors.difficultyBreathing =
        "Please select an option for Difficulty Breathing";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || Number(formData.age) < 0)
      newErrors.age = "Age must be a positive number";
    if (!formData.gender) newErrors.gender = "Please select a Gender";
    if (!formData.bloodPressure)
      newErrors.bloodPressure = "Please select Blood Pressure";
    if (!formData.cholesterolLevel)
      newErrors.cholesterolLevel = "Please select Cholesterol Level";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchDiseaseData = (disease) => {
    return fetch(
      `${import.meta.env.VITE_ONRENDER_MODEL_API}/general_diseases/predict`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Disease: disease,
          Fever: formData.fever,
          Cough: formData.cough,
          Fatigue: formData.fatigue,
          Difficulty_Breathing: formData.difficultyBreathing,
          Age: parseInt(formData.age, 10),
          Gender: formData.gender,
          Blood_Pressure: formData.bloodPressure,
          Cholesterol_Level: formData.cholesterolLevel,
        }),
      }
    ).then((response) => response.json().then((data) => data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (validateForm()) {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_ONRENDER_MODEL_API
          }/general_diseases/find_diseases`,
          {
            // Replace with your actual API URL
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Fever: formData.fever,
              Cough: formData.cough,
              Fatigue: formData.fatigue,
              Difficulty_Breathing: formData.difficultyBreathing,
              Age: parseInt(formData.age, 10),
              Gender: formData.gender,
              Blood_Pressure: formData.bloodPressure,
              Cholesterol_Level: formData.cholesterolLevel,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data["Disease Count"] === 0) {
          setIsNoDiseases(true);
          setDrawerContent({
            title: "No Diseases Found",
            description: "No diseases found based on the provided information.",
          });
          setIsOpen(true);
          setIsProcessing(false);
          return;
        } else {
          const diseases_array = data["Diseases"];

          try {
            const promises = diseases_array.map((disease) =>
              fetchDiseaseData(disease)
            );
            const results = await Promise.all(promises);
            console.log(results);

            setIsNoDiseases(false);
            setDrawerContent({
              title: "Diseases Found",
              description:
                "Matching diseases found based on the provided information. Here's what our model predicts:",
              results,
            });
            setIsOpen(true);
            setIsProcessing(false);
          } catch (error) {
            console.error("Error fetching disease data:", error);
            setIsProcessing(false);
          }
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsProcessing(false);
      }
    } else {
      console.log("Form has errors");
      setIsProcessing(false);
    }
  };

  const handleSaveReport = async (type, content) => {
    console.log(type, formData, content);
    await saveReport(type, formData, content);
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>General Disease Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {[
              {
                field: "fever",
                placeholder: "Have you had a fever?",
                description: "Indicate whether you have experienced a fever",
              },
              {
                field: "cough",
                placeholder: "Do you have a cough?",
                description: "Indicate whether you have been coughing",
              },
              {
                field: "fatigue",
                placeholder: "Do you feel fatigued?",
                description: "Indicate whether you are experiencing fatigue",
              },
              {
                field: "difficultyBreathing",
                placeholder: "Do you have difficulty breathing?",
                description: "Indicate whether you have trouble breathing",
              },
            ].map(({ field, description }) => (
              <div key={field} className="mb-4">
                <Label htmlFor={field} className="text-base capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <RadioGroup
                  name={field}
                  value={formData[field]}
                  onValueChange={(value) => handleSelectChange(field, value)}
                  className="flex flex-row space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Yes" id={`${field}-yes`} />
                    <Label htmlFor={`${field}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="No" id={`${field}-no`} />
                    <Label htmlFor={`${field}-no`}>No</Label>
                  </div>
                </RadioGroup>
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
                <small className="text-gray-500 mt-1">{description}</small>
              </div>
            ))}

            <div className="mb-4">
              <Label htmlFor="age" className="text-base">
                Age (in years)
              </Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-2"
                placeholder="Enter your age in years"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
              <small className="text-gray-500 mt-1">
                Age in years (e.g., 45)
              </small>
            </div>

            <div className="mb-4">
              <Label htmlFor="gender" className="text-base">
                Gender
              </Label>
              <Select
                name="gender"
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
              <small className="text-gray-500 mt-1">Select your gender</small>
            </div>

            <div className="mb-4">
              <Label htmlFor="bloodPressure" className="text-base">
                Blood Pressure
              </Label>
              <Select
                name="bloodPressure"
                value={formData.bloodPressure}
                onValueChange={(value) =>
                  handleSelectChange("bloodPressure", value)
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select blood pressure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.bloodPressure && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.bloodPressure}
                </p>
              )}
              <small className="text-gray-500 mt-1">
                Indicate your blood pressure level
              </small>
            </div>

            <div className="mb-4">
              <Label htmlFor="cholesterolLevel" className="text-base">
                Cholesterol Level
              </Label>
              <Select
                name="cholesterolLevel"
                value={formData.cholesterolLevel}
                onValueChange={(value) =>
                  handleSelectChange("cholesterolLevel", value)
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select cholesterol level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Normal">Normal</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              {errors.cholesterolLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cholesterolLevel}
                </p>
              )}
              <small className="text-gray-500 mt-1">
                Select your cholesterol level
              </small>
            </div>
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
            {isNoDiseases ? (
              <>
                <DrawerTitle className="text-center">
                  {drawerContent.title}
                </DrawerTitle>
                <DrawerDescription className="text-center">
                  {drawerContent.description}
                </DrawerDescription>
              </>
            ) : (
              <>
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
                    await handleSaveReport("general", drawerContent.results);
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
              </>
            )}
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
