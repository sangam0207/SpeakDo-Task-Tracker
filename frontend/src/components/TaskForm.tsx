
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Flag, AlertCircle } from "lucide-react";
import type { Priority, Status, TaskFormData } from "@/types/task.types";

interface TaskFormProps {
  formData: TaskFormData;
  onChange: (data: TaskFormData) => void;
  showStatus?: boolean;
}

const priorityConfig = {
  low: {
    color: "bg-blue-100 text-blue-700 border-blue-300",
    icon: "🔵",
    label: "Low",
  },
  medium: {
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    icon: "🟡",
    label: "Medium",
  },
  high: {
    color: "bg-orange-100 text-orange-700 border-orange-300",
    icon: "🟠",
    label: "High",
  },
};

const statusConfig = {
  todo: { color: "bg-slate-100 text-slate-700", label: "To Do" },
  "in-progress": { color: "bg-blue-100 text-blue-700", label: "In Progress" },
  done: { color: "bg-green-100 text-green-700", label: "Done" },
};

export default function TaskForm({
  formData,
  onChange,
  showStatus = true,
}: TaskFormProps) {
  const updateField = (field: keyof TaskFormData, value: string) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-3">
      {/* Title */}
      <div>
        <label className="text-xs font-semibold mb-1 block text-gray-800">
          Task Title *
        </label>
        <Input
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="What needs to be done?"
          className="border-2 border-gray-200 focus:border-purple-500 focus:ring-0 text-sm py-1.5 px-2.5 rounded-lg transition-colors h-8"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-semibold mb-1 block text-gray-800">
          Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Add details..."
          rows={2}
          className="border-2 border-gray-200 focus:border-purple-500 focus:ring-0 text-xs py-1.5 px-2.5 rounded-lg transition-colors resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div>
          <label className="text-xs font-semibold mb-1 flex items-center gap-1.5 text-gray-800">
            <Flag className="w-3.5 h-3.5 text-amber-600" />
            Priority
          </label>
          <Select
            value={formData.priority}
            onValueChange={(value: Priority) => updateField("priority", value)}
          >
            <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 focus:ring-0 hover:border-purple-300 transition-colors h-8 text-xs">
              <div className="flex items-center gap-1.5">
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              {Object.entries(priorityConfig).map(([key, config]) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-xs cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{config.icon}</span>
                    <span>{config.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-semibold mb-1 flex items-center gap-1.5 text-gray-800">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Due Date
          </label>
          <Input
            type="date"
            value={formData.dueDate ? formData.dueDate.split("T")[0] : ""}
            onChange={(e) => updateField("dueDate", e.target.value)}
            className="border-2 border-gray-200 focus:border-purple-500 focus:ring-0 hover:border-purple-300 transition-colors h-8 px-2.5 rounded-lg text-xs"
          />
        </div>

        {showStatus && (
          <div>
            <label className="text-xs font-semibold mb-1 flex items-center gap-1.5 text-gray-800">
              <AlertCircle className="w-3.5 h-3.5 text-teal-600" />
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value: Status) => updateField("status", value)}
            >
              <SelectTrigger className="border-2 border-gray-200 focus:border-purple-500 focus:ring-0 hover:border-purple-300 transition-colors h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="text-xs cursor-pointer"
                  >
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
