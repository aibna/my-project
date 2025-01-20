import { Link } from "react-router-dom";
import { AiFillMedicineBox, AiFillWarning } from "react-icons/ai";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdOutlineBloodtype } from "react-icons/md";
import { GiKidneys } from "react-icons/gi";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const HealthInsight = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/health-insights/general">
          <Card className="h-full p-6 text-center shadow-md hover:shadow-lg transition-shadow bg-secondary text-secondary-foreground flex flex-col items-center justify-center">
            <AiFillMedicineBox size={40} className="mb-4 text-primary" />
            <CardTitle className="text-xl font-semibold">
              General Disease
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Analyze general health risks and conditions.
            </CardDescription>
          </Card>
        </Link>

        <Link to="/health-insights/diabetes">
          <Card className="h-full p-6 text-center shadow-md hover:shadow-lg transition-shadow bg-secondary text-secondary-foreground flex flex-col items-center justify-center">
            <MdOutlineBloodtype size={40} className="mb-4 text-primary" />
            <CardTitle className="text-xl font-semibold">Diabetes</CardTitle>
            <CardDescription className="text-sm text-center">
              Check your risk for diabetes
            </CardDescription>
          </Card>
        </Link>

        <Link to="/health-insights/heart">
          <Card className="h-full p-6 text-center shadow-md hover:shadow-lg transition-shadow bg-secondary text-secondary-foreground flex flex-col items-center justify-center">
            <TbActivityHeartbeat size={40} className="mb-4 text-primary" />
            <CardTitle className="text-xl font-semibold">
              Heart Disease
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Evaluate your heart health and risk factors.
            </CardDescription>
          </Card>
        </Link>

        <Link to="/health-insights/kidney">
          <Card className="h-full p-6 text-center shadow-md hover:shadow-lg transition-shadow bg-secondary text-secondary-foreground flex flex-col items-center justify-center">
            <GiKidneys size={40} className="mb-4 text-primary" />
            <CardTitle className="text-xl font-semibold">
              Chronic Kidney Disease
            </CardTitle>
            <CardDescription className="text-sm text-center">
              Assess your likelihood of kidney health issues.
            </CardDescription>
          </Card>
        </Link>
      </div>

      <div className="mt-6 p-4 bg-accent text-accent-foreground border-l-4 border-accent">
        <p className="flex flex-col items-center justify-center gap-2 text-center text-xs">
          <AiFillWarning className="text-yellow-500 text-3xl"></AiFillWarning>
          <span className="flex-1">
            These prediction tools are not a substitute for professional medical
            diagnosis, treatment, or advice. Please consult a healthcare
            provider for any health concerns.
          </span>
        </p>
      </div>
    </div>
  );
};

export default HealthInsight;
