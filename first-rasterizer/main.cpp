//
//  main.cpp
//  first-rasterizer
//
//  Created by Chris Taguba on 9/23/23.
//

#include <iostream>
#include <GL/glew.h>
#include <GLFW/glfw3.h>

int main(void) {
    
    GLFWwindow *window;
    
    if (!glfwInit()) {
        return -1;
    }
    
    window = glfwCreateWindow(1280, 720, "First Rasterizer", NULL, NULL);
    
    if (!window) {
        glfwTerminate();
        return -1;
    }
    
    glfwMakeContextCurrent(window);
    
    while(!glfwWindowShouldClose(window)) {
        glClear( GL_COLOR_BUFFER_BIT );
        
        glfwSwapBuffers( window );
        
        glfwPollEvents();
    }
    
    glfwTerminate();
    return 0;
    
}
