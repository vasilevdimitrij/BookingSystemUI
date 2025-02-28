import React from "react";
import { Resource } from "../types";

interface ResourceListProps {
  resources: Resource[];
  onSelectResource: (resourceId: string) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  onSelectResource,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        Available Resources
      </h2>
      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectResource(resource.id)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-800">{resource.name}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {resource.totalQuantity} available
              </span>
            </div>
            <button
              className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onSelectResource(resource.id);
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
