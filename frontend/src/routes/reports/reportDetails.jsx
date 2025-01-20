import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Activity,
  Droplet,
  HeartPulse,
  LucideActivity,
  LucideDroplet,
  LucideFlaskConical,
  LucideFlaskConicalOff,
  LucideGitGraph,
  LucideHeart,
  LucideHeartPulse,
  LucideUser,
  Thermometer,
  User,
} from "lucide-react";
import { AiFillWarning } from "react-icons/ai";
import { GiArm, GiChemicalDrop, GiLungs } from "react-icons/gi";
import { MdBloodtype, MdPregnantWoman } from "react-icons/md";
import { useLoaderData } from "react-router-dom";

const ReportDetails = () => {
  const data = useLoaderData();

  console.log(data);

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-8 mt-4">Medical Report Details</h1>
      {data.type === "general" && (
        <>
          <h2 className="text-xl font-bold">General Disease Report</h2>
          <h2 className="mt-2 text-muted-foreground font-semibold mb-3">
            {new Date(data.created_at).toDateString()}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">Age:</span>
                  <span className="ml-2">{data.user_input.age}</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">Gender:</span>
                  <span className="ml-2">{data.user_input.gender}</span>
                </div>
                <div className="flex items-center">
                  <Thermometer className="mr-2 h-4 w-4" />
                  <span className="font-medium">Fever:</span>
                  <span className="ml-2">{data.user_input.fever}</span>
                </div>
                <div className="flex items-center">
                  <GiLungs className="mr-2 h-4 w-4" />
                  <span className="font-medium">Cough:</span>
                  <span className="ml-2">{data.user_input.cough}</span>
                </div>
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4" />
                  <span className="font-medium">Fatigue:</span>
                  <span className="ml-2">{data.user_input.fatigue}</span>
                </div>
                <div className="flex items-center">
                  <HeartPulse className="mr-2 h-4 w-4" />
                  <span className="font-medium">Blood Pressure:</span>
                  <span className="ml-2">{data.user_input.bloodPressure}</span>
                </div>
                <div className="flex items-center">
                  <Droplet className="mr-2 h-4 w-4" />
                  <span className="font-medium">Cholesterol Level:</span>
                  <span className="ml-2">
                    {data.user_input.cholesterolLevel}
                  </span>
                </div>
                <div className="flex items-center">
                  <GiLungs className="mr-2 h-4 w-4" />
                  <span className="font-medium">Difficulty Breathing:</span>
                  <span className="ml-2">
                    {data.user_input.difficultyBreathing}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">
                  Diagnosis ({data.content.length})
                </h3>
                <p className="mb-2 text-muted-foreground text-sm">
                  The provided symptoms match with these disease(s) in our
                  database. <br></br>Our AI model has predicted the following
                  outcomes for each of the diseases.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Disease Name</TableHead>
                      <TableHead className="text-left">Prediction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.content.map((result, index) => (
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
                <div className="mt-6 p-4 bg-accent text-accent-foreground border-l-4 border-accent rounded">
                  <p className="flex flex-col items-center justify-center gap-2 text-center text-xs">
                    <AiFillWarning className="text-yellow-500 text-3xl"></AiFillWarning>
                    <span className="flex-1">
                      These prediction tools are not a substitute for
                      professional medical diagnosis, treatment, or advice.
                      Please consult a healthcare provider for any health
                      concerns.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      {data.type === "diabetes" && (
        <>
          <h2 className="text-xl font-bold">Diabetes Report</h2>
          <h2 className="mt-2 text-muted-foreground font-semibold mb-3">
            {new Date(data.created_at).toDateString()}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <LucideActivity className="mr-2 h-4 w-4" />
                  <span className="font-medium">BMI:</span>
                  <span className="ml-2">{data.user_input.BMI}</span>
                </div>
                <div className="flex items-center">
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span className="font-medium">Age:</span>
                  <span className="ml-2">{data.user_input.age}</span>
                </div>
                <div className="flex items-center">
                  <LucideDroplet className="mr-2 h-4 w-4" />
                  <span className="font-medium">Glucose:</span>
                  <span className="ml-2">{data.user_input.glucose} mg/dL</span>
                </div>
                <div className="flex items-center">
                  <LucideDroplet className="mr-2 h-4 w-4" />
                  <span className="font-medium">Insulin:</span>
                  <span className="ml-2">{data.user_input.insulin} μU/mL</span>
                </div>
                <div className="flex items-center">
                  <MdPregnantWoman className="mr-2 h-4 w-4" />
                  <span className="font-medium">Number of Pregnancies:</span>
                  <span className="ml-2">{data.user_input.pregnancies}</span>
                </div>
                <div className="flex items-center">
                  <LucideHeart className="mr-2 h-4 w-4" />
                  <span className="font-medium">Blood Pressure:</span>
                  <span className="ml-2">
                    {data.user_input.bloodPressure} mmHg
                  </span>
                </div>
                <div className="flex items-center">
                  <GiArm className="mr-2 h-4 w-4" />
                  <span className="font-medium">Skin Thickness:</span>
                  <span className="ml-2">
                    {data.user_input.skinThickness} mm
                  </span>
                </div>
                <div className="flex items-center">
                  <MdBloodtype className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Diabetes Pedigree Function:
                  </span>
                  <span className="ml-2">
                    {data.user_input.diabetesPedigreeFunction}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">
                  Diagnosis for Diabetes
                </h3>
                <p className="mb-2 text-muted-foreground text-sm">
                  Our AI model has predicted the likelihood of diabetes. The
                  prediction is determined by analyzing various health metrics
                  and symptoms you have entered.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Disease Name</TableHead>
                      <TableHead className="text-left">Prediction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.content.map((result, index) => (
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
                <div className="mt-6 p-4 bg-accent text-accent-foreground border-l-4 border-accent rounded">
                  <p className="flex flex-col items-center justify-center gap-2 text-center text-xs">
                    <AiFillWarning className="text-yellow-500 text-3xl"></AiFillWarning>
                    <span className="flex-1">
                      These prediction tools are not a substitute for
                      professional medical diagnosis, treatment, or advice.
                      Please consult a healthcare provider for any health
                      concerns.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      {data.type === "kidney" && (
        <>
          <h2 className="text-xl font-bold">Chronic Kidney Disease Report</h2>
          <h2 className="mt-2 text-muted-foreground font-semibold mb-3">
            {new Date(data.created_at).toDateString()}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Albumin:</span>
                  <span className="ml-2">Level {data.user_input.Al}</span>
                </div>
                <div className="flex items-center">
                  <LucideHeart className="mr-2 h-4 w-4" />
                  <span className="font-medium">Blood Pressure:</span>
                  <span className="ml-2">{data.user_input.Bp} mmHg</span>
                </div>
                <div className="flex items-center">
                  <LucideHeart className="mr-2 h-4 w-4" />
                  <span className="font-medium">Blood Urea:</span>
                  <span className="ml-2">{data.user_input.Bu} mg/dL</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Serum Creatinine:</span>
                  <span className="ml-2">{data.user_input.Sc} mg/dL</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Specific Gravity:</span>
                  <span className="ml-2">{data.user_input.Sg}</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Sugar:</span>
                  <span className="ml-2">Level {data.user_input.Su}</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Potassium:</span>
                  <span className="ml-2">{data.user_input.Pot} mEq/L</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Red Blood Cells:</span>
                  <span className="ml-2">
                    {data.user_input.Rbc} millions cells/μL
                  </span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Sodium:</span>
                  <span className="ml-2">{data.user_input.Sod} mEq/L</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Hemoglobin:</span>
                  <span className="ml-2">{data.user_input.Hemo} g/dL</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">White Blood Cell Count:</span>
                  <span className="ml-2">{data.user_input.Wbcc} cells/cmm</span>
                </div>
                <div className="flex items-center">
                  <GiChemicalDrop className="mr-2 h-4 w-4" />
                  <span className="font-medium">Red Blood Cell Count:</span>
                  <span className="ml-2">
                    {data.user_input.Rbcc} million cells/μL
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideActivity className="mr-2 h-4 w-4" />
                  <span className="font-medium">Hypertension (HTN):</span>
                  <span className="ml-2">
                    {data.user_input.Htn === "1" ? "Yes" : "No"}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">
                  Diagnosis for Chronic Kidney Disease (CKD)
                </h3>
                <p className="mb-2 text-muted-foreground text-sm">
                  Our AI model has predicted the likelihood of Chronic Kidney
                  Disease based on the input data.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Disease Name</TableHead>
                      <TableHead className="text-left">Prediction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.content.map((result, index) => (
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
                <div className="mt-6 p-4 bg-accent text-accent-foreground border-l-4 border-accent rounded">
                  <p className="flex flex-col items-center justify-center gap-2 text-center text-xs">
                    <AiFillWarning className="text-yellow-500 text-3xl" />
                    <span className="flex-1">
                      These prediction tools are not a substitute for
                      professional medical diagnosis, treatment, or advice.
                      Please consult a healthcare provider for any health
                      concerns.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      {data.type === "heart" && (
        <>
          <h2 className="text-xl font-bold">Heart Disease Report</h2>
          <h2 className="mt-2 text-muted-foreground font-semibold mb-3">
            {new Date(data.created_at).toDateString()}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center">
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span className="font-medium">Age:</span>
                  <span className="ml-2">{data.user_input.age}</span>
                </div>
                <div className="flex items-center">
                  <LucideUser className="mr-2 h-4 w-4" />
                  <span className="font-medium">Sex:</span>
                  <span className="ml-2">
                    {parseInt(data.user_input.sex) === 1 ? "Male" : "Female"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideHeart className="mr-2 h-4 w-4" />
                  <span className="font-medium">Chest Pain Type (CP):</span>
                  <span className="ml-2">
                    {parseInt(data.user_input.cp) === 1 && "Typical Angina"}
                    {parseInt(data.user_input.cp) === 2 && "Atypical Angina"}
                    {parseInt(data.user_input.cp) === 3 && "Non-Anginal Pain"}
                    {parseInt(data.user_input.cp) === 4 && "Asymptomatic"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideActivity className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Resting Blood Pressure (Trestbps):
                  </span>
                  <span className="ml-2">{data.user_input.trestbps} mmHg</span>
                </div>
                <div className="flex items-center">
                  <LucideFlaskConical className="mr-2 h-4 w-4" />
                  <span className="font-medium">Cholesterol (Chol):</span>
                  <span className="ml-2">{data.user_input.chol} mg/dL</span>
                </div>
                <div className="flex items-center">
                  <LucideActivity className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Fasting Blood Sugar (FBS):
                  </span>
                  <span className="ml-2">
                    {parseInt(data.user_input.fbs) === 1
                      ? "More than 120 mg/dL"
                      : "Less than or equal to 120 mg/dL"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideHeartPulse className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Resting Electrocardiographic Results (Restecg):
                  </span>
                  <span className="ml-2">
                    {parseInt(data.user_input.restecg) === 0 && "Normal"}
                    {parseInt(data.user_input.restecg) === 1 &&
                      "ST-T Wave Abnormality"}
                    {parseInt(data.user_input.restecg) === 2 &&
                      "Left Ventricular Hypertrophy"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideActivity className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Maximum Heart Rate Achieved (Thalach):
                  </span>
                  <span className="ml-2">{data.user_input.thalach} bpm</span>
                </div>
                <div className="flex items-center">
                  <LucideActivity className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Exercise-Induced Angina (Exang):
                  </span>
                  <span className="ml-2">
                    {parseInt(data.user_input.exang) === 1 ? "Yes" : "No"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideGitGraph className="mr-2 h-4 w-4" />
                  <span className="font-medium">ST Depression (Oldpeak):</span>
                  <span className="ml-2">{data.user_input.oldpeak}</span>
                </div>
                <div className="flex items-center">
                  <LucideGitGraph className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Slope of the Peak Exercise ST Segment (Slope):
                  </span>
                  <span className="ml-2">
                    {parseInt(data.user_input.slope) === 0 && "Upsloping"}
                    {parseInt(data.user_input.slope) === 1 && "Flat"}
                    {parseInt(data.user_input.slope) === 2 && "Downsloping"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideFlaskConicalOff className="mr-2 h-4 w-4" />
                  <span className="font-medium">
                    Number of Major Vessels (CA):
                  </span>
                  <span className="ml-2">{data.user_input.ca}</span>
                </div>
                <div className="flex items-center">
                  <LucideFlaskConical className="mr-2 h-4 w-4" />
                  <span className="font-medium">Thalassemia (Thal):</span>
                  <span className="ml-2">
                    {parseInt(data.user_input.thal) === 3 && "Normal"}
                    {parseInt(data.user_input.thal) === 6 && "Fixed Defect"}
                    {parseInt(data.user_input.thal) === 7 &&
                      "Reversible Defect"}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Diagnosis</CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">
                  Diagnosis for Heart Disease
                </h3>
                <p className="mb-2 text-muted-foreground text-sm">
                  Our AI model has predicted the likelihood of Heart Disease
                  based on the input data.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">Disease Name</TableHead>
                      <TableHead className="text-left">Prediction</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.content.map((result, index) => (
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
                <div className="mt-6 p-4 bg-accent text-accent-foreground border-l-4 border-accent rounded">
                  <p className="flex flex-col items-center justify-center gap-2 text-center text-xs">
                    <AiFillWarning className="text-yellow-500 text-3xl" />
                    <span className="flex-1">
                      These prediction tools are not a substitute for
                      professional medical diagnosis, treatment, or advice.
                      Please consult a healthcare provider for any health
                      concerns.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportDetails;
