import React from "react";
import { Briefcase } from "lucide-react";
import RecruiterLayout from "../../../layouts/RecruiterLayout";

export default function JobPostPage() {
  return (
    <RecruiterLayout>
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border bg-card p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="size-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Create Job Posting</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Fill in the details below to create a new job posting.
          </p>

          <div className="border border-dashed rounded-lg p-12 text-center text-muted-foreground">
            Job posting form will be implemented here.
          </div>
        </div>
      </div>
    </RecruiterLayout>
  );
}
