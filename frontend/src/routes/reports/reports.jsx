import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { deleteReport, getUserReports } from "@/utils/reports";
import { Eye, SortAsc, SortDesc, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [type, setType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const fetchedReports = await getUserReports({
          sort: sortOrder,
          type: type,
        });
        setReports(fetchedReports);
        console.log(fetchedReports);
        setLoading(false);
        setTriggerRefetch(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
        setTriggerRefetch(false);
      }
    };

    fetchReports();
  }, [sortOrder, type, triggerRefetch]);
  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="flex items-center gap-2 mb-8 flex-col md:flex-row">
        <Toggle
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
          className="whitespace-nowrap"
        >
          Sort by date{" "}
          {sortOrder === "asc" ? <SortAsc></SortAsc> : <SortDesc></SortDesc>}
        </Toggle>
        <ToggleGroup
          type="single"
          defaultValue="all"
          className="px-6 max-w-[100vw]"
        >
          <ToggleGroupItem
            value="all"
            aria-label="Toggle bold"
            onClick={() => setType(null)}
          >
            ALL
          </ToggleGroupItem>
          <ToggleGroupItem
            value="general"
            aria-label="Toggle italic"
            onClick={() => setType("general")}
          >
            GENERAL
          </ToggleGroupItem>
          <ToggleGroupItem
            value="diabetes"
            aria-label="Toggle underline"
            onClick={() => setType("diabetes")}
          >
            DIABETES
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heart"
            aria-label="Toggle underline"
            onClick={() => setType("heart")}
          >
            HEART
          </ToggleGroupItem>
          <ToggleGroupItem
            value="kidney"
            aria-label="Toggle underline"
            onClick={() => setType("kidney")}
          >
            KIDNEY
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {loading ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h1 className="h-6 w-[90%] bg-gray-200 animate-pulse"></h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="h-6 w-1/3 bg-gray-200 animate-pulse mb-3"></h1>
                <h1 className="h-6 w-1/4 bg-gray-200 animate-pulse"></h1>
              </CardContent>
              <CardFooter className="flex justify-between">
                <h1 className="h-6 w-20 bg-gray-200 animate-pulse"></h1>
                <h1 className="h-6 w-20 bg-gray-200 animate-pulse"></h1>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h1 className="h-6 w-[90%] bg-gray-200 animate-pulse"></h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="h-6 w-1/3 bg-gray-200 animate-pulse mb-3"></h1>
                <h1 className="h-6 w-1/4 bg-gray-200 animate-pulse"></h1>
              </CardContent>
              <CardFooter className="flex justify-between">
                <h1 className="h-6 w-20 bg-gray-200 animate-pulse"></h1>
                <h1 className="h-6 w-20 bg-gray-200 animate-pulse"></h1>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h1 className="h-6 w-[90%] bg-gray-200 animate-pulse"></h1>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h1 className="h-6 w-1/3 bg-gray-200 animate-pulse mb-3"></h1>
                <h1 className="h-6 w-1/4 bg-gray-200 animate-pulse"></h1>
              </CardContent>
              <CardFooter className="flex justify-between">
                <h1 className="h-6 w-20 bg-gray-200 animate-pulse"></h1>
                <h1 className="h-6 w-20 bg-gray-200 animate-pulse"></h1>
              </CardFooter>
            </Card>
          </div>
        </>
      ) : (
        <>
          {reports.length === 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive text-center py-24">
                    No Reports Found
                  </CardTitle>
                </CardHeader>
              </Card>
            </>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reports.map((report) => (
                  <Card key={report.id}>
                    <CardHeader>
                      <CardTitle>
                        {report.type === "general" && "General Disease Report"}
                        {report.type === "diabetes" && "Diabetes Report"}
                        {report.type === "kidney" &&
                          "Chronic Kidney Disease Report"}
                        {report.type === "heart" && "Heart Disease Report"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(report.created_at).toDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground font-semibold mt-1">
                        {report.content
                          .map((disease) => disease.Disease_Name)
                          .join(", ")}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/reports/${report.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your medical report from our
                              servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => {
                                await deleteReport(report.id);
                                setTriggerRefetch(true);
                                return;
                              }}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Reports;
