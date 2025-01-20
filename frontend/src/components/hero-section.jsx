import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { getUser } from "@/utils/auth";
import { Calendar, Brain, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeroSectionComponent() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getRole = async () => {
      const { data } = await getUser();
      if (data) {
        console.log(data);
        setRole(data.session.user.user_metadata.role);
      }
    };
    getRole();
  }, [user]);

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4">
        <section className="py-12 md:py-24 lg:pt-32 md:pb-12">
          <div className="space-y-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Your Health, Powered by AI
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Experience the future of healthcare with MediAI. Book appointments
              with ease and get AI-powered disease predictions based on your
              health data.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!user ? (
                <>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <>
                  {role === "doctor" ? (
                    <>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/manage-appointments")}
                      >
                        Manage Appointment
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/patient-data")}
                      >
                        View Patient Data
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/appointments")}
                      >
                        Book Appointment
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => navigate("/health-insights")}
                      >
                        Get Prediction
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        <section className="py-12 md:pt-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Calendar
                  className="h-10 w-10 text-primary mb-2"
                  aria-hidden="true"
                />
                <CardTitle>Easy Appointment Booking</CardTitle>
                <CardDescription>
                  Schedule appointments with top doctors at your convenience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our intuitive booking system allows you to choose the perfect
                  time slot that fits your schedule. No more long waits or phone
                  calls.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Brain
                  className="h-10 w-10 text-primary mb-2"
                  aria-hidden="true"
                />
                <CardTitle>AI-Powered Predictions</CardTitle>
                <CardDescription>
                  Get insights into potential health risks using advanced AI
                  models.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our state-of-the-art AI analyzes your health data to provide
                  early warnings and personalized health recommendations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Stethoscope
                  className="h-10 w-10 text-primary mb-2"
                  aria-hidden="true"
                />
                <CardTitle>Expert Medical Care</CardTitle>
                <CardDescription>
                  Connect with experienced healthcare professionals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our network of qualified doctors ensures you receive the best
                  possible care, combining human expertise with AI-driven
                  insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
