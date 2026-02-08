import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/empty-state";
import { TableSkeleton } from "@/components/loading-skeleton";
import type { Resource } from "@shared/schema";
import { FileText, Download, Search, File, FileImage, FileVideo, FileArchive } from "lucide-react";
import { useState } from "react";

const getFileIcon = (fileType: string | null) => {
  if (!fileType) return File;
  const type = fileType.toLowerCase();
  if (type.includes("image")) return FileImage;
  if (type.includes("video")) return FileVideo;
  if (type.includes("zip") || type.includes("archive")) return FileArchive;
  return FileText;
};

export default function ClientResources() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/client/resources"],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <TableSkeleton />
      </div>
    );
  }

  const fileTypes = Array.from(new Set(resources?.map((r) => r.fileType).filter(Boolean) ?? []));

  const filteredResources = resources?.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || resource.fileType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">
          Access your consulting materials and documents.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-type">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {fileTypes.map((type) => (
                  <SelectItem key={type} value={type!}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      {filteredResources && filteredResources.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const Icon = getFileIcon(resource.fileType);
            return (
              <Card key={resource.id} className="hover-elevate">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-medium truncate">{resource.title}</h3>
                      {resource.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {resource.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 pt-2">
                        {resource.fileType && (
                          <Badge variant="secondary" className="text-xs uppercase">
                            {resource.fileType}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(resource.createdAt!), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {resource.fileUrl && (
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      asChild
                      data-testid={`button-download-${resource.id}`}
                    >
                      <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12">
            <EmptyState
              icon={FileText}
              title={search || filterType !== "all" ? "No results found" : "No resources yet"}
              description={
                search || filterType !== "all"
                  ? "Try adjusting your search or filters."
                  : "Resources shared by your consultant will appear here."
              }
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
