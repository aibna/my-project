import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserReportsForDoctor } from "@/utils/reports";
import ReportViewer from "./reportViewer";

export default function PatientData() {
  const [searchEmail, setSearchEmail] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedReport, setSelectedReport] = useState({});
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const data = await getUserReportsForDoctor({
          sort: sortBy,
          type: typeFilter,
          email: searchEmail,
        });
        setFilteredReports(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [searchEmail, typeFilter, sortBy]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input
          type="email"
          placeholder="Search by patient email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">View Latest Report</SelectItem>
            <SelectItem value="desc">View Oldest Report</SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value) => setTypeFilter(value)}
          defaultValue={typeFilter}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>All types</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="heart">Heart</SelectItem>
            <SelectItem value="kidney">Kidney</SelectItem>
            <SelectItem value="diabetes">Diabetes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="h-[70vh] overflow-y-auto">
          <CardHeader>
            <CardTitle>Reports Viewer</CardTitle>
          </CardHeader>
          <CardContent>
            {searchEmail === "" ? (
              <>
                <h1 className="text-muted-foreground">
                  View patient reports using his/her email.
                </h1>
              </>
            ) : (
              <>
                {loading ? (
                  <>
                    <Card className={`mb-2`}>
                      <CardContent className="py-3">
                        <h1 className="h-5 w-1/2 bg-gray-200 animate-pulse"></h1>
                        <h1 className="h-5 w-1/3 bg-gray-200 animate-pulse my-3"></h1>
                        <h1 className="h-5 w-1/4 bg-gray-200 animate-pulse"></h1>
                      </CardContent>
                    </Card>
                    <Card className={`mb-2`}>
                      <CardContent className="py-3">
                        <h1 className="h-5 w-1/2 bg-gray-200 animate-pulse"></h1>
                        <h1 className="h-5 w-1/3 bg-gray-200 animate-pulse my-3"></h1>
                        <h1 className="h-5 w-1/4 bg-gray-200 animate-pulse"></h1>
                      </CardContent>
                    </Card>
                    <Card className={`mb-2`}>
                      <CardContent className="py-3">
                        <h1 className="h-5 w-1/2 bg-gray-200 animate-pulse"></h1>
                        <h1 className="h-5 w-1/3 bg-gray-200 animate-pulse my-3"></h1>
                        <h1 className="h-5 w-1/4 bg-gray-200 animate-pulse"></h1>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    {filteredReports.length === 0 ? (
                      <>
                        <h1 className="text-muted-foreground text-red-500">
                          No Reports Found,
                        </h1>
                      </>
                    ) : (
                      <>
                        {filteredReports.map((report) => (
                          <Card
                            key={report.id}
                            className={`cursor-pointer mb-2 hover:shadow-md hover:border-black duration-150 ${
                              selectedReport.id === report.id
                                ? "border-black"
                                : "opacity-85"
                            }`}
                            onClick={() => {
                              if (selectedReport.id === report.id) {
                                setSelectedReport({});
                              } else {
                                setSelectedReport(report);
                              }
                            }}
                          >
                            <CardContent className="py-3">
                              <p className="text-base font-semibold">
                                {report.type === "general" &&
                                  "General Disease Report"}
                                {report.type === "diabetes" &&
                                  "Diabetes Report"}
                                {report.type === "kidney" &&
                                  "Chronic Kidney Disease Report"}
                                {report.type === "heart" &&
                                  "Heart Disease Report"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Date:{" "}
                                {new Date(report.created_at).toDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground font-semibold mt-1">
                                {report.content
                                  .map((disease) => disease.Disease_Name)
                                  .join(", ")}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
        <Card className="h-[70vh] overflow-y-auto">
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.values(selectedReport).length === 0 &&
            selectedReport.constructor === Object ? (
              <>
                <h1 className="text-muted-foreground">
                  View report details by selecting one.
                </h1>
              </>
            ) : (
              <>
                <ReportViewer report={selectedReport} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
